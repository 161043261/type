/* eslint-disable @typescript-eslint/no-unused-vars */
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { readFileSync } from "node:fs";
const secretKey = "salt"; // 加盐

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/jsonp", (req, resp) => {
  const { callback /* string */ } = req.query;
  resp.send(`${callback}('jsonp')`);
});

app.get("/api/json", (_req, resp) => {
  // 允许任何主机 (域名), 端口, 协议的 GET 请求
  // .setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  resp.json({ name: "json" });
});

app.get("/api/sse", (_req, resp) => {
  resp.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  resp.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "close",
  });
  const data = readFileSync("./network.md", "utf-8");
  const total = data.length;
  let cur = 0;
  const timerId = setInterval(() => {
    console.log(((cur / total) * 100).toFixed(2) + "%");
    if (cur >= total) {
      console.log("end");
      clearInterval(timerId);
      return;
    }
    resp.write("event:network\n");
    console.log(`${data.split("")[cur]}`);
    resp.write(`data:${data.split("")[cur]}\n\n`);
    cur++;
  }, 500);
});

app.post("/api/beacon", (_req, _resp) => {
  console.log("Hitted");
});

const user = { username: "user", password: "1234", id: 1 }; // 模拟用户数据

app.post("/api/login", (req, resp) => {
  console.log(req.body);
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    resp.json({
      code: 200,
      msg: "login successful",
      token: jwt.sign(
        {
          id: user.id,
        },
        secretKey /* 加盐 */,
        {
          expiresIn: 60 * 60 * 24,
        },
      ),
    });
  } else {
    resp.json({
      msg: "login failed",
      code: 400,
    });
  }
});

app.get("/api/list", (req, resp) => {
  console.log(req.headers.authorization);
  jwt.verify(req.headers.authorization as string, secretKey, (err, buf) => {
    if (err) {
      resp.json({
        code: 403,
        msg: "invalid token",
      });
    } else {
      resp.json({
        code: 200,
        msg: "valid token",
        data: [
          { id: 1, name: "user" },
          { id: 2, name: "root" },
        ],
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Serving on http://localhost:3000");
});
