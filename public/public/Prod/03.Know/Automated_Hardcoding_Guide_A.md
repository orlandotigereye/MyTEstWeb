# Advanced Technical: Automated Subtitle Burn-In | 進階技術：自動化字幕硬編碼

How to use FFmpeg to "burn" professional captions into your MP4 automatically.
如何使用 FFmpeg 自動將專業字幕「燒錄」進您的 MP4 影片中。

---

## 🏗️ 1. The Concept | 核心概念
We use the FFmpeg `subtitles` filter to overlay an `.srt` file onto your video, or the `drawtext` filter for dynamic titles.
我們使用 FFmpeg 的 `subtitles` 濾鏡將 `.srt` 檔案疊加到影片上，或使用 `drawtext` 濾鏡製作動態標題。

---

## 📝 2. Creating the Subtitle File (.srt) | 建立字幕檔
You can generate this file automatically from your Google Sheet data.
您可以從 Google 表格數據自動產生此檔案。

**Example SRT Format**:
```text
1
00:00:01,000 --> 00:00:04,000
Hi! I am your automated Live2D host.

2
00:00:04,500 --> 00:00:08,000
I can act and speak with zero manual effort!
```

---

## 💻 3. FFmpeg Command Logic | FFmpeg 指令邏輯
Add this to your post-processing script:
將此指令加入您的後處理腳本中：

```bash
ffmpeg -i input.mp4 -vf "subtitles=mysubtitles.srt:force_style='FontSize=24,PrimaryColour=&H00FFFF&'" -c:a copy output_with_subs.mp4
```
- **force_style**: Allows you to set the font size and color (e.g., **Success Gold**).
- **重點**：這能確保字幕與影片合而為一，且在任何平台上都不會跑掉。

---

## 🎨 4. Dynamic "Burn-In" Title | 動態「燒錄」標題
If you want to add a permanent "Hook" title at the top:
如果您想在頂部加入一個永久性的「勾子」標題：

```bash
ffmpeg -i input.mp4 -vf "drawtext=text='RECORDED AUTOMATICALLY':fontcolor=white:fontsize=40:box=1:boxcolor=black@0.5:boxborderw=5:x=(w-text_w)/2:y=50" -codec:a copy output_final.mp4
```

---

## 🚀 Why this is powerful | 為什麼這有效
- **Speed**: You don't need to open Premiere or CapCut just to add a title. (無需為了加標題而開啟剪輯軟體)
- **Batching**: You can caption 100 videos in a single command. (一次為 100 支影片上字幕)

---

## 💡 Pro Tip | 專家建議
Use the **Subtitle & Typography Guide** to choose the best font and color values for your `force_style` settings to maintain brand consistency.

-----

*Created by Project Assistant on 2026-01-06*
