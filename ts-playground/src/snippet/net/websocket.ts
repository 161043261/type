/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ws from "ws";

const wss = new ws.Server({ port: 8080 });
const state = {
  HEARTBEAT: 1, // 心跳包
  DATAGRAM: 2, // 数据包
};

wss.on("connection", (ws) => {
  console.log("Dial start");
  ws.on("message", (buf) => {
    console.log("Client sent:", buf.toString());
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          state: state.DATAGRAM,
          msg: "echo: " + buf,
        }),
      );
    });
  });
  let timerId: any;
  const sendHeart = () => {
    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          state: state.HEARTBEAT,
          msg: "heartbeat",
        }),
      );
    } else {
      clearInterval(timerId);
    }
  };
  timerId = setInterval(sendHeart, 5000);
  ws.on("close", () => {
    console.log("Dial stop");
    process.exit(0);
  });
});
