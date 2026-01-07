# Technical Customization Guide | 技術自定義指南 (解析度/FPS/速度)

How to fine-tune the automation engine for specific high-end results.
如何微調自動化引擎以達成特定的高端產出效果。

---

## 📺 1. Changing Resolution (4K / Vertical) | 修改解析度
To change the output size, you must update BOTH the **JavaScript** and **HTML** files.
若要修改輸出大小，必須「同時」更新 JavaScript 與 HTML 檔案。

### **In the .js Script (e.g., Pro_D.js)**:
Find these lines:
```javascript
'--window-size=1280,720' // Change to 3840,2160 for 4K
await page.setViewport({ width: 1280, height: 720 });
```

### **In the .html Template (e.g., L09.html)**:
Ensure the `vOffset` and `scale` values are adjusted to fit the new canvas size. (確保偏移與比例能適應新畫布)

---

## 🎞️ 2. Adjusting FPS (Frame Rate) | 修改幀率
We currently record at **12 FPS** for physics stability.
目前我們以 12 FPS 錄製以確保物理穩定性。

### **In the .js Script**:
To increase quality (at the risk of lag), find:
```javascript
'-r', '12', // Change to '24' or '30'
const fps = 12;
```
**Warning**: Only increase FPS if you have a very fast CPU. (僅在 CPU 足夠強大時增加幀率)

---

## 🗣️ 3. Speaking Speed (TTS) | 修改說話速度
Find this line in the **HTML** file inside the `speak()` function:
在 HTML 檔案的 `speak()` 函式中找到：

```javascript
ut.rate = 0.6; // 0.1 (Slowest) to 2.0 (Fastest)
```
- **0.6**: Ideal for 12 FPS recording. (12 FPS 錄影的理想值)
- **1.0**: Natural human speed. (正常語速)

---

## 🚀 Pro Tip | 專家建議
Always perform a **Technical Sanity Check** after changing these values. 4K recordings take much more disk space and processing time!

-----

*Created by Project Assistant on 2026-01-06*
