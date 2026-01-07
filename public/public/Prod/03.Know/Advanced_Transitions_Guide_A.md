# Advanced Technical: Cinematic Transitions & FX | 進階技術：電影級轉場與特效

How to add professional visual polish during scene changes.
如何在場景切換期間加入專業的視覺磨練效果。

---

## 🎞️ 1. The Concept | 核心概念
Instead of an instant "Cut," we trigger **CSS Animations** on an overlay element or the character container to create a smooth transition.
與其使用瞬間的「剪接」，我們在疊加元素或角色容器上觸發 **CSS 動畫**，以建立平滑的轉場。

---

## 🎞️ 2. Transition Types | 轉場類型

### **A. The "Fade to Black" (經典淡出)**
- **Effect**: Scene darkens, background changes, then scene lightens.
- **CSS**: `opacity: 0` -> `opacity: 1` over 1 second.
- **適用**：時間流逝或切換至不同地點時。

### **B. The "Slide Reveal" (側邊滑動)**
- **Effect**: The new character "Slides" into the frame from the left or right.
- **CSS**: `transform: translateX(100%)` -> `translateX(0)`.
- **適用**：介紹新成員或進行團體初次亮相時。

---

## 💻 3. JavaScript Logic | 指令碼實作
Add this to your command parser to handle the visual transition:
在指令碼解析器中加入此邏輯，處理視覺轉場：

```javascript
async function triggerTransition(type) {
    const stage = document.querySelector('.stage');
    stage.classList.add('transition-' + type); // Trigger CSS animation
    await new Promise(r => setTimeout(r, 1000)); // Wait for half of transition
    // Perform the background/model change here (在此執行背景或模型更換)
    await new Promise(r => setTimeout(r, 1000)); // Finish transition
    stage.classList.remove('transition-' + type);
}
```

---

## ✨ 4. Visual FX: The "Glow" Effect | 視覺特效：發光感
Add a subtle "Bloom" or "Glow" to your character to make the art pop.
為您的角色加入細微的「泛光」或「發光」效果，讓美術效果更突出。
- **CSS**: `filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))`.
- **重點**：使用您的品牌色彩 (**Success Gold**) 作為發光顏色，能建立強大的視覺聯想。

---

## 🚀 Why this increases Value | 為什麼這能提升價值
- **Motion Graphics**: It moves your tool from a "Recorder" to a "Production Suite."
- **Retention**: Smooth movement is satisfying to watch, keeping users on the video longer.
- **重点**：這是讓經紀公司願意簽署 $499+ 合約的「視覺魔力」。

---

## 🚀 Pro Tip | 專家建議
Combine the **Fade to Black** transition with a **CAMERA:reset** command. It makes the "Next Scene" feel fresh and professionally directed.

-----

*Created by Project Assistant on 2026-01-06*
