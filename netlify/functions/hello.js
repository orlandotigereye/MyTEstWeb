exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello! 這是來自 Netlify Function 的回應。",
      time: new Date().toISOString()
    }),
  };
};