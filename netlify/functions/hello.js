// netlify/functions/hello.js
exports.handler = async (event, context) => {
    // 預期回傳的資料
    const responseData = {
        status: "success",
        message: "你好！這是來自 Netlify Serverless Function 的回應",
        timestamp: new Date().toISOString(),
        environment: "Netlify Production"
    };

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            // 雖然同網域不需要，但加上 CORS 可增加彈性
            "Access-Control-Allow-Origin": "*" 
        },
        body: JSON.stringify(responseData)
    };
};
