# Netlify Function 範例

這是用於示範如何在 Netlify 運行靜態網站 + Functions 的例子專案。

## 檔案說明

- **index.html**: 主頁，提供按鈕呼叫 Functions。
- **netlify/functions/hello.js**: 簡單的 serverless function，回應 JSON。
- **netlify.toml**: Netlify 設定檔。
- **README.md**: 此文件。

## 如何部署

1. **建立 GitHub Repository**
   - 在 GitHub 上建立一個新的儲存庫，將這些檔案加入。

2. **連接至 Netlify**
   - 登入 [Netlify](https://www.netlify.com/)。
   - 點擊 "New Site from Git"
   - 選擇這個專案的 GitHub repo，並設定以下：
     - **Build Command**: 留空
     - **Publish Directory**: `.`
   - 點擊 **Deploy Site**

3. **測試網站**
   - 部署後，你將獲得一個免費的 Netlify 網址。
   - 開啟網站，你可以測試按鈕是否正確呼叫 Function。

### License
MIT