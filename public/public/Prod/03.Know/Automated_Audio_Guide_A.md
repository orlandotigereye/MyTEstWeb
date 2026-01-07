# Advanced Technical: Automated Audio Layering | 進階技術：自動化音訊分層

How to automatically add background music to your MP4 via FFmpeg.
如何透過 FFmpeg 自動為您的 MP4 影片加入背景音樂。

---

## 🏗️ 1. The Concept | 核心概念
We modify the FFmpeg command in your `.js` script to accept a **second input** (the audio file) and merge it with the video frames.
我們修改 `.js` 腳本中的 FFmpeg 指令，接受「第二個輸入」（音訊檔）並與影片畫面合併。

---

## 📂 2. Preparation | 準備工作
Place your background music file (e.g., `bgm.mp3`) in the `public/linve2D/` folder.
將您的背景音樂檔案放入 `public/linve2D/` 資料夾中。

---

## 💻 3. Script Modification | 腳本修改
In your recording script (e.g., `Pro_D.js`), update the `spawn('ffmpeg', ...)` section:
在錄影腳本中更新 FFmpeg 調用部分：

```javascript
const ffmpeg = spawn('ffmpeg', [
    '-f', 'image2pipe', '-vcodec', 'png', '-r', '12', '-i', '-', // Video Input
    '-i', path.resolve('public/linve2D/bgm.mp3'), // Audio Input (新加入)
    '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18',
    '-map', '0:v:0', '-map', '1:a:0', // Map video from 1st input, audio from 2nd
    '-shortest', // Stop recording when the video ends
    '-y', outputPath
]);
```

---

## 🎬 4. The Benefit | 為什麼要這麼做
- **Zero-Editing Workflow**: Your MP4 is ready for IG/X the moment the script finishes. (零剪輯工作流)
- **Consistency**: Every video has the same high-quality audio mixing. (一致的高品質音訊混音)
- **重点**：這對於「批量製作 (Batching)」非常關鍵，能為您省下大量的剪輯時間。

---

## 🚀 Pro Tip | 專家建議
If the music is too loud, add a filter to the FFmpeg command: `'-filter_complex', '[1:a]volume=0.3[a1]', '-map', '0:v', '-map', '[a1]'`. This lowers the BGM volume to 30% so the character's speech stays clear.

-----

*Created by Project Assistant on 2026-01-06*
