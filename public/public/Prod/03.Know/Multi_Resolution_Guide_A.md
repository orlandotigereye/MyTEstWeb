# Advanced Technical: Multi-Resolution Toggling | 進階技術：多解析度自動化切換

How to generate Vertical (9:16) and Horizontal (16:9) content from a single script.
如何透過單一腳本同時產生直式 (9:16) 與橫式 (16:9) 內容。

---

## 🏗️ 1. The Logic Switch | 邏輯開關
Add a `resolution` variable at the top of your `.js` recording script.
在 `.js` 錄影腳本頂部加入一個 `resolution` 變數。

```javascript
const mode = "vertical"; // Options: "vertical" or "landscape"

const configs = {
    vertical: { width: 1080, height: 1920, chromeSize: "1080,1920" },
    landscape: { width: 1920, height: 1080, chromeSize: "1920,1080" }
};

const currentConfig = configs[mode];
```

---

## 💻 2. Dynamic Browser Setup | 動態瀏覽器設定
Update your `puppeteer.launch` and `setViewport` to use these values:
更新您的 `puppeteer.launch` 與 `setViewport` 以套用這些數值：

```javascript
'--window-size=' + currentConfig.chromeSize,
// ... other args
await page.setViewport({ width: currentConfig.width, height: currentConfig.height });
```

---

## 🎨 3. HTML Layout Auto-Adjustment | HTML 版面自動調整
Add this CSS logic to your template to ensure the character stays centered regardless of the ratio:
在模板中加入此 CSS 邏輯，確保角色在不同比例下皆能置中：

```css
.stage {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
#container-main {
    width: 100%; /* Automatically scales based on parent container */
}
```

---

## 🚀 4. Why this is powerful | 為什麼這很強大
- **Instant Repurposing**: Record once for IG, change one word, record again for YouTube. (秒速轉化：錄完 IG 後改個字就能錄 YouTube)
- **Scalability**: Your system is now ready for ANY platform (TikTok, Twitter, LinkedIn).
- **重点**：這讓您能以最小的技術成本，佔領所有的內容通路。

---

## 🚀 Pro Tip | 專家建議
Combine this with **Automated Subtitle Hardcoding**. Use larger font sizes for Vertical (Mobile) and smaller, cleaner fonts for Horizontal (Desktop) to match viewer expectations!

-----

*Created by Project Assistant on 2026-01-06*
