import dgram from "node:dgram";
import readline from "node:readline";
import { Buffer } from "node:buffer";

const serverIP = "127.0.0.1";
const serverPort = 24642;

const client = dgram.createSocket("udp4");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tx() {
  readlineInterface.question(
    "Enter message, press q/Q to quit: ",
    (content: string) => {
      if (content === "q" || content === "Q") {
        console.log("Gracefully close");
        readlineInterface.close();
        client.close();
        return;
      }
      const msg = Buffer.from(content);
      client.send(msg.toString(), serverPort, serverIP, (err, bytes) => {
        if (err) {
          console.error(err);
        }
        if (bytes === 0) {
          console.warn("No bytes sent");
        }
      });
    },
  );
}

client.on("listening", () => {
  const socket = client.address();
  console.log(
    `Listening for UDP packets from ${socket.address}:${socket.port}`,
  );
});

client.on("message", (msg: Buffer, remoteInfo: dgram.RemoteInfo) => {
  console.log(
    `\nRx from ${remoteInfo.address}:${remoteInfo.port}, msg: ${msg}`,
  );
  tx();
});

client.on("error", (err) => {
  console.error(`Client error: ${err.stack}`);
  readlineInterface.close();
  client.close();
});

client.bind(0, () => {
  const addr = client.address();
  console.log(`Client binding on ${addr.address}:${addr.port}`);
  client.send("ping", serverPort, serverIP, (err, bytes) => {
    if (err) {
      console.error(err);
    }
    if (bytes === 0) {
      console.warn("No bytes sent");
    }
  });
});
