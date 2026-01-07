/* * 修正重點 (v2.9):
 * 1. 增加主播視窗框：在右下角繪製具設計感的金色圓形 Frame。
 * 2. 整體協調優化：調整版面比例，確保文字與主播視窗不衝突。
 * 3. 珍珠白金主題：維持高品質現代教學視覺。
 * 4. 480p 高效產出：規避 Netlify 限制。
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const PptxGenJS = require("pptxgenjs");
const Busboy = require("busboy");
const { createCanvas, loadImage } = require("canvas");

const IS_WIN = process.platform === "win32";
const BASE_TMP = IS_WIN ? "c:/tmp/gemini_v29" : "/tmp";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F1C40F";
const BG = "#FDFDFD";
const TEXT = "#333333";

const SHIZUKU_SPRITE = "https://i.imgur.com/xHnZtY4.png";
const END_IMG_URL = "https://iili.io/fGM9XsV.jpg";

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function drawFrame(ctx, title, body, frameInfo, anchorImg) {
    const { f, gF, totalGF } = frameInfo;
    const w = 854, h = 480;
    
    // 1. 背景與動態光暈
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.05; ctx.fillStyle = GOLD;
    const time = gF * 0.06;
    ctx.beginPath();
    ctx.arc(w/2 + Math.sin(time)*130, h/2 + Math.cos(time*0.7)*90, 240, 0, Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // 2. 主裝飾外框
    ctx.strokeStyle = GOLD; ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // 3. 教學內容區
    let alpha = 1.0; if (f < 15) alpha = f / 15;
    ctx.globalAlpha = alpha;
    
    // 標題條
    ctx.fillStyle = GOLD; ctx.fillRect(40, 40, 520, 45);
    ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 24px sans-serif";
    ctx.fillText(title, 65, 73);

    // 內文 (調整寬度避免被主播框遮擋)
    ctx.fillStyle = TEXT; ctx.font = "20px sans-serif";
    const lines = body.split("\n");
    let curY = 135;
    lines.forEach(l => {
        // 每行長度縮短以留出右側空間
        for (let i = 0; i < l.length; i += 32) {
            ctx.fillText(l.substring(i, i + 32), 65, curY);
            curY += 34;
        }
    });

    // 4. 右下角主播視窗 (Frame 方式)
    ctx.globalAlpha = 1.0;
    const breathe = Math.sin(gF * 0.1) * 6;
    const centerX = w - 110, centerY = h - 110 + breathe;
    const radius = 80;

    ctx.save();
    // 繪製陰影
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // 繪製外圈金色圓框
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = GOLD;
    ctx.fill();
    
    // 繪製內圈淺金色圓框
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = GOLD_LIGHT;
    ctx.fill();

    // 裁切主播圖片區域
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // 背景填充 (視窗內)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    // 繪製 Shizuku
    if (anchorImg) {
        const scale = 1.0 + Math.sin(gF * 0.1) * 0.01;
        const aW = 200 * scale, aH = 200 * scale;
        ctx.drawImage(anchorImg, centerX - aW/2, centerY - aH/2 + 10, aW, aH);
    }
    ctx.restore();

    // 5. 底部進度條
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

        const slides = [];
        uploadedFiles.forEach(f => {
            const content = f.buf.toString("utf8");
            const lines = content.split(/\r?\n/).filter(l => l.trim());
            if (lines.length > 0) {
                const sTitle = lines[0];
                const sBody = lines.slice(1).join("\n");
                const limit = 260; // 降低每頁字數以配合主播視窗
                for (let i = 0; i < sBody.length; i += limit) {
                    slides.push({ title: sTitle, body: sBody.substring(i, i + limit) });
                }
            }
        });

        if (mode === "video") {
            const jobId = `v29_${Date.now()}`;
            const jobDir = path.join(BASE_TMP, jobId);
            ensureDir(jobDir);

            const FPS = 12, SEC = 4;
            const totalGF = (slides.length + 1) * SEC * FPS;
            const canvas = createCanvas(854, 480);
            const ctx = canvas.getContext("2d");
            
            let shizukuImg, endImg;
            try { shizukuImg = await loadImage(SHIZUKU_SPRITE); } catch(e){}
            try { endImg = await loadImage(END_IMG_URL); } catch(e){}

            let gIdx = 0;
            const processSlides = slides.slice(0, 10);
            
            for (let i = 0; i < processSlides.length; i++) {
                for (let f = 0; f < SEC * FPS; f++) {
                    await drawFrame(ctx, processSlides[i].title, processSlides[i].body, { f, gF: gIdx, totalGF }, shizukuImg);
                    fs.writeFileSync(path.join(jobDir, `f_${String(gIdx).padStart(5, '0')}.png`), canvas.toBuffer("image/png"));
                    gIdx++;
                }
            }

            // 結尾
            for (let f = 0; f < SEC * FPS; f++) {
                ctx.fillStyle = BG; ctx.fillRect(0,0,854,480);
                ctx.globalAlpha = f / (SEC * FPS);
                if (endImg) ctx.drawImage(endImg, 854/2 - 90, 480/2 - 130, 180, 180);
                ctx.fillStyle = GOLD; ctx.font = "bold 30px sans-serif"; ctx.textAlign="center";
                ctx.fillText("SHIZUKU VIRTUAL CLASS", 854/2, 400);
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
                headers: { "Content-Type": "video/mp4", "Content-Disposition": "attachment; filename=Lesson_V29.mp4" },
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
            headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation", "Content-Disposition": "attachment; filename=lesson.pptx" },
            body: pptBuf.toString("base64")
        };

    } catch (e) {
        return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: true, msg: e.message }) };
    }
};
