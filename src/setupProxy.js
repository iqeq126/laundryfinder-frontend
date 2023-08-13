const { createProxyMiddleware } = require("http-proxy-middleware");

const target_url = "http://172.19.86.24";
//const target_url = "http://192.168.0.2";
// target_url = "http://127.0.0.1:8000/"
module.exports = function(app){
  app.use(
    createProxyMiddleware("/parse", {
      target: "https://api.ocr.space/parse",
      secure: false,
      changeOrigin: true,
    }),
  ); 
  app.use(
    createProxyMiddleware("/yolov5-onnxruntime-web", {
      target: "https://" + target_url + ":3001",
      secure: false,
      changeOrigin: true,
    }),
  ); 
  app.use(
    createProxyMiddleware("/data", {
      target: "https://api.openweathermap.org",
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/clothes", {
      target: target_url + ":8000",
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/backend", {
      target: target_url + ":8000",
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/api2", {
      target: target_url + ":8000",
      secure: false,
      changeOrigin: true,
    }),
  );/*
  app.use(
    createProxyMiddleware("/images", {
      target: image_url,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/tag_images", {
      target: image_url,
      changeOrigin: true,
    }),
  );*/
  app.use(
    createProxyMiddleware("/getWthrDataList", {
      target: "https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/list", {
      target: target_url+":8000",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/list2", {
      target: target_url+":8000",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/detail", {
      target: target_url + ":8000",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/update", {
      target: target_url + ":8000",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/insert", {
      target: target_url + ":8000",
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/delete", {
      target: target_url + ":8000",
      changeOrigin: true,
    }),
  );
};