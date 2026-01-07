# Advanced Technical: Automated Scene Lighting | 進階技術：自動化場景燈光與濾鏡

How to change the cinematic mood of your scene mid-recording.
如何在錄影中途改變場景的電影氛圍。

---

## 🏗️ 1. The Concept | 核心概念
We use **CSS Filters** on the `body` or `#dynamic-bg` element, triggered by a command in your Google Sheet.
我們對 `body` 或 `#dynamic-bg` 元素使用 **CSS 濾鏡**，並透過 Google 表格中的指令觸發。

---

## 📊 2. Sheet Setup | 表格設定
Add a "LIGHTING" command in your **Role** column.
在 A 欄位中加入 "LIGHTING" 指令。

| Column A (Role/Light) | Column B (Effect) |
| :--- | :--- |
| **LIGHTING:dusk** | brightness(0.7) sepia(0.3) |
| miku | "Is it getting dark already?" |
| **LIGHTING:night** | brightness(0.4) hue-rotate(240deg) |
| miku | "Wow, look at those city lights!" |

---

## 💻 3. HTML Logic Modification | HTML 邏輯修改
Add this logic to your script loop:
在指令碼迴圈中加入此邏輯：

```javascript
if (role.startsWith('LIGHTING:')) {
    const filterValue = text; // The CSS filter string from Column B
    document.body.style.filter = filterValue;
    document.getElementById('dynamic-bg').style.filter = filterValue;
    continue;
}
```

---

## 🎨 4. Common Filter Recipes | 常見濾鏡配方
- **Golden Hour**: `brightness(1.1) sepia(0.2) saturate(1.2)`
- **Cyberpunk Night**: `brightness(0.6) hue-rotate(280deg) saturate(1.5)`
- **Noir / Flashback**: `grayscale(1) contrast(1.2)`
- **重点**：這些效果能讓您的展示影片看起來更具「故事性」。

---

## 🚀 Pro Tip | 專家建議
When changing the lighting, coordinate it with a background change (Column C) for the most realistic effect. Changing to a "Night" background while applying a "Dark Blue" filter creates perfect immersion.

-----

*Created by Project Assistant on 2026-01-06*
