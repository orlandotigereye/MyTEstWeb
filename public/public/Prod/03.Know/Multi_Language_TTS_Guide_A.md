# Advanced Technical: Multi-Language TTS | 進階技術：多國語言語音與在地化

How to make your characters speak English, Japanese, and Chinese flawlessly.
如何讓您的角色完美地說出英、日、中三種語言。

---

## 🏗️ 1. The Concept | 核心概念
We use the browser's native `speechSynthesis` API, but we add a **Language Switcher** triggered by your Google Sheet.
我們使用瀏覽器內建的語音合成 API，但加入一個由 Google 表格觸發的「語言切換器」。

---

## 📊 2. Sheet Setup | 表格設定
Add a **LANG** command in your script to tell the character when to change their accent.
在劇本中加入 "LANG" 指令，告訴角色何時更換口音。

| Column A (Role/Command) | Column B (Text) |
| :--- | :--- |
| **LANG:ja-JP** | (Next lines will be Japanese) |
| miku | "こんにちは！私の名前は初音ミクです。" |
| **LANG:en-US** | (Switching to English accent) |
| miku | "I can also speak perfect English now!" |

---

## 💻 3. HTML Logic Modification | HTML 實作邏輯
Update your `speak()` function to accept a dynamic `lang` parameter:
更新 `speak()` 函式以接受動態語言參數：

```javascript
let currentLang = 'zh-TW'; // Default

async function speak(text) {
    if (text.startsWith('LANG:')) {
        currentLang = text.split(':')[1];
        return; // No speech needed for the command
    }
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = currentLang; 
    ut.rate = 0.6;
    speechSynthesis.speak(ut);
}
```

---

## 🌎 4. Recommended Language Codes | 建議語言代碼
- **Japanese**: `ja-JP` (Essential for Booth.pm market)
- **English**: `en-US` or `en-GB`.
- **Chinese (Traditional)**: `zh-TW`.
- **Chinese (Mandarin)**: `zh-CN`.

---

## 🚀 Pro Tip | 專家建議
Use the **Japanese Market Strategy** guide to write the actual Japanese scripts. Even a simple "Arigato!" said with a proper `ja-JP` voice will double the trust of Japanese viewers watching your demos!

-----

*Created by Project Assistant on 2026-01-06*
