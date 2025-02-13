import express from "express";
const port = 8080;
const app = express();

app.get("/user", (req, res) => {
  res.json({
    code: 200,
    message: "200",
  });
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
