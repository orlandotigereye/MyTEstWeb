# Advanced Technical: Automated Video Watermarking | 進階技術：自動化影片浮水印嵌入

How to automatically add your brand logo to every MP4 via FFmpeg.
如何透過 FFmpeg 自動為您的每支 MP4 影片加入品牌標誌。

---

## 🏗️ 1. The Concept | 核心概念
We use the FFmpeg `overlay` filter to place a transparent `.png` logo on top of the video stream during the recording process.
我們使用 FFmpeg 的 `overlay` 濾鏡，在錄製過程中將透明的 `.png` 標誌疊加在影片串流上。

---

## 📂 2. Preparation | 準備工作
1. Create a transparent PNG logo (e.g., `watermark.png`, size around 200x200px).
2. Place it in the `public/linve2D/` folder.
3. 準備一張透明標誌圖（約 200x200px），存放在 `public/linve2D/` 資料夾。

---

## 💻 3. Script Modification | 腳本修改
In your recording script (e.g., `Pro_D.js`), update the `spawn('ffmpeg', ...)` section:
在錄影腳本中更新 FFmpeg 調用部分：

```javascript
const ffmpeg = spawn('ffmpeg', [
    '-f', 'image2pipe', '-vcodec', 'png', '-r', '12', '-i', '-', // Video Input
    '-i', path.resolve('public/linve2D/watermark.png'), // Logo Input (新加入)
    '-filter_complex', 'overlay=W-w-20:H-h-20', // Position: Bottom Right with 20px padding
    '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18',
    '-y', outputPath
]);
```
- **overlay=W-w-20:H-h-20**: 
  - `W-w`: Video width minus logo width.
  - `-20`: 20 pixels padding from the edge.
  - **重點**：這會將浮水印精確放置在右下角。

---

## 🛡️ 4. Why this matters | 為什麼這很重要
- **Brand Protection**: Even if someone re-posts your video, your logo stays on it. (品牌保護：防止他人盜用影片)
- **Studio Look**: Makes your automated output look like it came from a professional production house. (提升專業感)
- **重点**：這在 VTuber 社群中非常重要，因為視覺資產的來源標註是誠信的體現。

---

## 🚀 Pro Tip | 專家建議
Use a semi-transparent logo (50% opacity) so it doesn't distract the viewer from the character art. You can even combine this with **Automated Audio Layering** for a truly "Zero-Touch" production line!

-----

*Created by Project Assistant on 2026-01-06*
