import http from "node:http";
import urllib from "node:url";

const port = 8080;
const replyArgs = { data: "200" };
http
  .createServer((req, res) => {
    const params = urllib.parse(req.url, true);
    if (params.query.callback) {
      console.log("callback:", params.query.callback);
      //                                      jsonp
      const chunk = `${params.query.callback}(${JSON.stringify(replyArgs)})`;
      console.log("chunk:", chunk);
      res.end(chunk);
    } else {
      res.end();
    }
  })
  .listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
  });
