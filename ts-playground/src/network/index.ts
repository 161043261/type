import express from "express";
const app = express();

app.get("/api/jsonp", (req, res) => {
  const { callback /* string */ } = req.query;
  res.send(`${callback}('jsonp')`);
});

app.get("/api/json", (_req, res) => {
  // 允许任何主机 (域名), 端口, 协议的 GET 请求
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.json({ name: "json" });
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
