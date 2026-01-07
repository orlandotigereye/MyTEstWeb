# Advanced Technical: Cinematic Camera Automation | 進階技術：電影級鏡頭縮放與平移

How to automate professional camera movements via Google Sheet commands.
如何透過 Google 表格指令自動執行專業的鏡頭動作。

---

## 🏗️ 1. The Concept | 核心概念
We apply **CSS Transforms** to the `#container-main` element. By changing the `scale` and `translate` values mid-recording, we simulate a professional camera rig.
我們對 `#container-main` 元素應用 **CSS 轉換**。透過在錄製中途變更縮放 (scale) 與位移 (translate) 數值，來模擬專業的攝影機架具。

---

## 📊 2. Sheet Setup | 表格設定
Add a **CAMERA** command in your script to tell the system where to look.
在劇本中加入 "CAMERA" 指令，告訴系統鏡頭焦點。

| Column A (Role/Camera) | Column B (Effect) |
| :--- | :--- |
| **CAMERA:zoom-in** | scale(1.5) translateY(10%) |
| miku | "Wait... are you looking at me?" |
| **CAMERA:reset** | scale(1) translateY(0) |
| miku | "Anyway, let's continue the tour!" |

---

## 💻 3. HTML Implementation | HTML 實作邏輯
Add this logic to your command parser:
將此邏輯加入您的指令解析器中：

```javascript
if (role.startsWith('CAMERA:')) {
    const transformValue = text; // The CSS transform string from Column B
    const container = document.getElementById('container-main');
    container.style.transition = "transform 2s ease-in-out"; // Smooth movement
    container.style.transform = transformValue;
    await new Promise(r => setTimeout(r, 2000)); // Wait for camera to move
    continue;
}
```

---

## 🎬 4. Cinematic Shot Types | 常見電影鏡頭類型
- **The Close-Up (特寫)**: `scale(1.8) translateY(15%)` - Use for emotional or whispering lines.
- **The Reveal Pan (平移展示)**: `scale(1.2) translateX(-20%)` - Move slowly from left to right to show rigging details.
- **The Wide Shot (遠景)**: `scale(0.8) translateY(0)` - Use for introductions or when showing multiple characters.

---

## 🚀 Why this is a "Game Changer" | 為什麼這能改變局勢
- **Dynamic Energy**: Keeps the viewer's eyes moving and engaged. (保持觀眾注意力)
- **High Perceived Value**: It looks like you spent hours in After Effects, but it's 100% automated. (看起來像後製大作，實則全自動)
- **Agency Standard**: This is the specific feature high-end VTuber agencies look for in a showcase tool. (高端經紀公司最看重的功能)

---

## 🚀 Pro Tip | 專家建議
Use a **Slow Transition** (2-3 seconds) for pans and a **Fast Transition** (0.5 seconds) for dramatic "Impact Zooms." This variation in speed makes the storytelling feel more professional.

-----

*Created by Project Assistant on 2026-01-06*
