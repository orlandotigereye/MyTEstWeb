# Advanced Technical: Multi-Model Cycling | 進階技術：多模型自動輪播指南

How to showcase an entire "Generation" or collection in one recording.
如何在單次錄影中展示整個「期數」或系列模型。

---

## 🏗️ 1. The Concept | 核心概念
Instead of a static character, we use a **Dynamic Switcher** in the HTML that changes the `AVATARS` key based on a command in your Google Sheet.
我們在 HTML 中使用一個「動態切換器」，根據 Google 表格中的指令變更模型。

---

## 📊 2. Sheet Setup | 表格設定
Add a new column or use the "Role" column to trigger a model change.
使用 A 欄位來觸發模型切換。

| Column A (Role/Model) | Column B (Text) |
| :--- | :--- |
| **SWITCH:shizuku** | (Leave empty or welcome text) |
| shizuku | "Hi, I'm Shizuku!" |
| **SWITCH:miku** | (Change happening now...) |
| miku | "And I'm Miku! Nice to meet you." |

---

## 💻 3. HTML Logic Modification | HTML 邏輯修改
Add this logic inside your `runDrama()` or `runScript()` loop:
在劇本迴圈中加入此邏輯：

```javascript
if (role.startsWith('SWITCH:')) {
    const modelKey = role.split(':')[1];
    initLive2D(modelKey); // Re-initialize the iframe with the new model
    await new Promise(r => setTimeout(r, 5000)); // Wait for load
    continue;
}
```

---

## 🎬 4. Why this is a "Premium" Feature | 為什麼這是高階功能
- **Agencies**: They can record a "Meet our Talents" video for 10+ characters in one go.
- **Artists**: They can showcase their entire portfolio in a single "Mega Reel."
- **重點**：這能為您爭取到經紀公司這類高單價客戶。

---

## 🚀 Pro Tip | 專家建議
When switching models, change the **Success Gold** subtitle color to match the new character's theme color. This small detail adds massive professional value!

-----

*Created by Project Assistant on 2026-01-06*
