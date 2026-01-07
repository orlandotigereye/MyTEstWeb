# AI-Generated Script Translation Guide | AI 驅動劇本自動翻譯指南

How to use AI to globalize your scripts while preserving technical commands.
如何利用 AI 讓劇本全球化，同時保留技術指令。

---

## 🤖 1. The Translation Challenge | 翻譯的挑戰
When translating scripts, you must ensure the **Commands** (e.g., `SWITCH:miku`) are NOT translated, but the **Dialogue** is.
翻譯劇本時，必須確保「指令」不被翻譯，但「對白」要翻譯。

---

## 🤖 2. The Master Prompt | 核心提示詞框架
Use this prompt with ChatGPT or Gemini to get perfect results.
使用此提示詞以獲得完美結果。

**Prompt Template**:
"Act as a professional translator specialized in VTuber culture. Translate the following 'Dialogue' column into [Target Language, e.g., Japanese]. 

**CRITICAL RULES**:
1. Do NOT translate any text that starts with a colon-command (e.g., `SWITCH:`, `LIGHTING:`, `CAMERA:`).
2. Maintain the tone of a [Character Personality].
3. Output the result as a table.

**Source Data**:
[Paste your Google Sheet columns here]"

---

## 🤖 3. Language Nuance Tips | 各國語言優化技巧

### **For Japanese (ja-JP)**
- Use "Polite" vs "Casual" forms based on the character.
- Ensure honorifics like "-san" or "-chan" are used correctly to build trust with JP viewers.
- **重點**：根據角色個性使用適當的敬語或口語，增加日本受眾的親切感。

### **For English (en-US)**
- Use internet slang and VTuber terminology (e.g., "debut," "rigger," "scuff").
- **重點**：使用網路俚語與 VTuber 術語，讓內容看起來更道地。

---

## 🚀 4. Workflow Integration | 工作流整合
1. Copy your original Chinese script.
2. Run the AI translation prompt.
3. Paste the new columns into a new **Language Tab** in your Google Sheet.
4. Run the **Pro D Script** with the new Sheet ID!

---

## 🚀 Pro Tip | 專家建議
Combine this with the **Multi-Language TTS Guide**. After the AI translates the text, use the `LANG:` command at the top of your sheet to ensure the voice matches the new language automatically!

-----

*Created by Project Assistant on 2026-01-06*
