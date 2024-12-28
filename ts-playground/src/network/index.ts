import express from "express";
const app = express();

app.get("/api/jsonp", (req, res) => {
  const { callback /* Function */ } = req.query;
  console.log(typeof callback); // string
  res.send(`${callback}('express')`);
});

app.get("/api/json", (_req, res) => {
  // 允许任何主机 (域名), 端口, 协议的请求
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.json({ name: "express" });
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
