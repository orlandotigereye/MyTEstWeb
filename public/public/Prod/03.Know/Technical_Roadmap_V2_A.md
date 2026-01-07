# Technical Roadmap: v1.2 to v2.0 | 技術路線圖規範

The specific technical logic for your next major product updates.
下一個重大產品更新的具體技術邏輯。

---

## 🛠️ v1.2: The "Workflow Optimizer" (短期目標)
**Focus**: Efficiency and File Management.
- **Auto-Naming Logic**: Update the `.js` script to use a variable for filenames.
  - *Logic*: `outputPath = path.resolve('public/linve2D/' + characterName + '_' + Date.now() + '.mp4')`.
- **Integrated BGM**: Implement the FFmpeg audio merge logic from our **Automated Audio Guide**.
- **重點**：實現自動命名與自動背景音樂嵌入。

---

## 🛠️ v1.5: The "Cinematic Update" (中期目標)
**Focus**: Visual Fidelity and Lighting.
- **CSS Filter Integration**: Add the `LIGHTING:` command parser to the core script loop.
- **Resolution Presets**: Add a configuration object at the top of the script to toggle between `Portrait (9:16)` and `Landscape (16:9)` instantly.
- **重點**：整合自動化燈光系統與一鍵切換直式/橫式解析度。

---

## 🛠️ v2.0: The "Pro Dashboard" (長期目標)
**Focus**: User Experience and Standalone App.
- **Local GUI**: Build a simple HTML/Electron interface to write scripts and trigger recordings, replacing Google Sheets for power users.
- **Cloud-Sync**: Allow users to save their "Stage Settings" (scale, offset, backgrounds) to a local `config.json` file.
- **重点**：建立本地圖形介面，徹底擺脫對 Google 表格的依賴，並支援存取設定檔。

---

## 📈 Development Schedule | 開發時程建議
- **v1.2**: Complete by the end of Month 1. (達成 1,000 美元營收後啟動)
- **v1.5**: Complete by the end of Month 2.
- **v2.0**: The "Grand Launch" for Month 4.

---

## 🚀 Pro Tip | 專家建議
Build features based on the **Customer Feedback Survey** results! If 80% of users ask for a specific background, move that feature to v1.2.

-----

*Created by Project Assistant on 2026-01-06*
