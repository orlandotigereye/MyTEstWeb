/* * 修正重點 (v3.0):
 * 1. 強化 Shizuku 主播：優化右下角 Frame 視窗，增加外發光效果。
 * 2. 呼吸動態升級：角色縮放與位移更為平滑，模擬 Live2D 待機感。
 * 3. 視覺統一：珍珠白底色 + 金色質感邊框 + 透明 Logo。
 * 4. 480p/12fps：在 Netlify 10s 限制下實現最長可讀時間。
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const PptxGenJS = require("pptxgenjs");
const Busboy = require("busboy");
const { createCanvas, loadImage } = require("canvas");

const IS_WIN = process.platform === "win32";
const BASE_TMP = IS_WIN ? "c:/tmp/gemini_v30" : "/tmp";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#FFD700";
const BG = "#FDFDFD";
const TEXT = "#333333";

// 高品質透明 Shizuku 立繪 (模擬 Live2D 形象)
const SHIZUKU_IMG = "https://i.imgur.com/xHnZtY4.png"; 
const END_IMG_URL = "https://iili.io/fGM9XsV.jpg";

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function drawFrame(ctx, title, body, frameInfo, anchorImg) {
    const { f, gF, totalGF } = frameInfo;
    const w = 854, h = 480;
    
    // 1. 背景與緩慢光暈
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.06; ctx.fillStyle = GOLD;
    const time = gF * 0.05;
    ctx.beginPath();
    ctx.arc(w/2 + Math.cos(time)*150, h/2 + Math.sin(time*0.8)*100, 260, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // 2. 教學版面裝飾
    ctx.strokeStyle = GOLD; ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);

    // 3. 文字動畫
    let alpha = 1.0; if (f < 15) alpha = f / 15;
    ctx.globalAlpha = alpha;
    
    ctx.fillStyle = GOLD; ctx.fillRect(40, 40, 520, 45);
    ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 24px sans-serif";
    ctx.fillText(title, 65, 72);

    ctx.fillStyle = TEXT; ctx.font = "20px sans-serif";
    const lines = body.split("\n");
    let curY = 135;
    lines.forEach(l => {
        // 配合右下角視窗，文字寬度限制
        for (let i = 0; i < l.length; i += 30) {
            ctx.fillText(l.substring(i, i + 30), 65, curY);
            curY += 34;
        }
    });

    // 4. Shizuku 主播視窗 (Frame)
    ctx.globalAlpha = 1.0;
    const breathe = Math.sin(gF * 0.12) * 5; 
    const scale = 1.0 + Math.sin(gF * 0.12) * 0.015;
    const cx = w - 120, cy = h - 120 + breathe;
    const r = 85;

    ctx.save();
    // 視窗外發光
    ctx.shadowColor = GOLD; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
    ctx.fillStyle = GOLD; ctx.fill();
    ctx.shadowBlur = 0;

    // 白色背景圓
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF"; ctx.fill();
    ctx.clip();

    // 繪製主播
    if (anchorImg) {
        const aW = 210 * scale, aH = 210 * scale;
        ctx.drawImage(anchorImg, cx - aW/2, cy - aH/2 + 15, aW, aH);
    }
    ctx.restore();

    // 5. 動態進度條
    const progress = gF / totalGF;
    ctx.fillStyle = GOLD;
    ctx.fillRect(10, h - 12, (w - 20) * progress, 4);
}

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST ONLY" };
    const mode = event.queryStringParameters?.mode || "ppt";

    try {
        const busboy = Busboy({ headers: event.headers });
        const uploadedFiles = [];
        await new Promise((resolve, reject) => {
            busboy.on("file", (name, file, info) => {
                const chunks = [];
                file.on("data", d => chunks.push(d));
                file.on("end", () => uploadedFiles.push({ buf: Buffer.concat(chunks) }));
            });
            busboy.on("finish", resolve);
            busboy.on("error", reject);
            busboy.end(Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8"));
        });

        if (uploadedFiles.length === 0) throw new Error("Missing File");

        const slides = [];
        uploadedFiles.forEach(f => {
            const content = f.buf.toString("utf8");
            const lines = content.split(/\r?\n/).filter(l => l.trim());
            if (lines.length > 0) {
                const sTitle = lines[0];
                const sBody = lines.slice(1).join("\n");
                const limit = 240; 
                for (let i = 0; i < sBody.length; i += limit) {
                    slides.push({ title: sTitle, body: sBody.substring(i, i + limit) });
                }
            }
        });

        if (mode === "video") {
            const jobId = `v30_${Date.now()}`;
            const jobDir = path.join(BASE_TMP, jobId);
            ensureDir(jobDir);

            const FPS = 12, SEC = 4;
            const totalGF = (slides.length + 1) * SEC * FPS;
            const canvas = createCanvas(854, 480);
            const ctx = canvas.getContext("2d");
            
            let shizukuImg, endImg;
            try { shizukuImg = await loadImage(SHIZUKU_IMG); } catch(e){}
            try { endImg = await loadImage(END_IMG_URL); } catch(e){}

            let gIdx = 0;
            const limitSlides = slides.slice(0, 8); // 限制頁數保證 10s 內完成
            
            for (let i = 0; i < limitSlides.length; i++) {
                for (let f = 0; f < SEC * FPS; f++) {
                    await drawFrame(ctx, limitSlides[i].title, limitSlides[i].body, { f, gF: gIdx, totalGF }, shizukuImg);
                    fs.writeFileSync(path.join(jobDir, `f_${String(gIdx).padStart(5, '0')}.png`), canvas.toBuffer("image/png"));
                    gIdx++;
                }
            }

            // 結尾
            for (let f = 0; f < SEC * FPS; f++) {
                ctx.fillStyle = BG; ctx.fillRect(0,0,854,480);
                ctx.globalAlpha = f / (SEC * FPS);
                if (endImg) ctx.drawImage(endImg, 854/2 - 100, 480/2 - 140, 200, 200);
                ctx.fillStyle = GOLD; ctx.font = "bold 32px sans-serif"; ctx.textAlign="center";
                ctx.fillText("SHIZUKU VIRTUAL ACADEMY", 854/2, 410);
                ctx.globalAlpha = 1.0;
                ctx.fillRect(10, 468, 834 * (gIdx / totalGF), 4);
                fs.writeFileSync(path.join(jobDir, `f_${String(gIdx).padStart(5, '0')}.png`), canvas.toBuffer("image/png"));
                gIdx++;
            }

            const out = path.join(jobDir, "out.mp4");
            execSync(`ffmpeg -y -i "${jobDir}/f_%05d.png" -c:v libx264 -preset ultrafast -pix_fmt yuv420p "${out}"`);
            const buf = fs.readFileSync(out);
            fs.rmSync(jobDir, { recursive: true, force: true });

            return {
                statusCode: 200,
                isBase64Encoded: true,
                headers: { "Content-Type": "video/mp4", "Content-Disposition": "attachment; filename=Shizuku_Class.mp4" },
                body: buf.toString("base64")
            };
        }

        const pptx = new PptxGenJS();
        slides.forEach(s => {
            const slide = pptx.addSlide(); slide.background = { fill: BG };
            slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.5, w: 9, h: 0.6, fill: { color: GOLD } });
            slide.addText(s.title, { x: 0.7, y: 0.5, w: 8.5, h: 0.6, fontSize: 24, color: "FFFFFF" });
            slide.addText(s.body, { x: 0.7, y: 1.5, w: 11.5, fontSize: 18, color: TEXT });
        });
        const pptBuf = await pptx.write("nodebuffer");
        return {
            statusCode: 200,
            isBase64Encoded: true,
            headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation", "Content-Disposition": "attachment; filename=Shizuku_Lesson.pptx" },
            body: pptBuf.toString("base64")
        };

    } catch (e) {
        return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: true, msg: e.message }) };
    }
};
