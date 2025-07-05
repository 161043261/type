// @ts-ignore
import { KCP } from "./kcpNode";
import dgram from "node:dgram";

const kcpObject = new KCP(123, { address: "127.0.0.1", port: 41234 });
const idx = 1;
const delay = 200;
const client = dgram.createSocket("udp4");
const msg = {
  id: 1,
  route: "test",
  body: "",
};

kcpObject.stream(1);
kcpObject.nodelay(0, delay, 0, 0);

function outputCallback(
  msg: string | NodeJS.ArrayBufferView,
  length: number,
  context: { port: number; address: string },
) {
  const { port, address } = context;
  const offset = 0;
  client.send(msg, offset, length, port, address);
}

kcpObject.output(outputCallback);

client.on("error", (err) => {
  console.error("Client error", err.stack);
  client.close();
});

client.on("message", (buf: Buffer, rinfo: dgram.RemoteInfo) => {
  kcpObject.input(buf);
  const recv = kcpObject.recv();
  if (recv) {
    const recvStr = recv.toString();
    const { address, port } = kcpObject.context();
    console.log(`Client receive ${recvStr} from ${address}:${port}`);

    // Make next msg
    msg.id++;
    msg.body = new Date().toISOString();

    kcpObject.send(JSON.stringify(msg));
  }
});

setInterval(() => {
  kcpObject.update(Date.now());
}, delay);

kcpObject.send(JSON.stringify(msg));
