// @ts-ignore
import { KCP } from "./kcpNode";
import dgram from "node:dgram";

// console.log(KCP);
const server = dgram.createSocket("udp4");
const clients: Record<string, any> = {};
const delay = 200;

function outputCallback(
  msg: string | NodeJS.ArrayBufferView,
  length: number,
  context: { port: number; address: string },
) {
  const { port, address } = context;
  const offset = 0;
  server.send(msg, offset, length, port, address);
}

server.on("error", (err) => {
  console.error("Server error", err.stack);
  server.close();
});

server.on("message", (buf: Buffer, rinfo: dgram.RemoteInfo) => {
  const { address, port } = rinfo;
  const clientKey = `${address}-${port}`; // IPv4, IPv6
  if (!clients[clientKey]) {
    const context = {
      address,
      port,
    };
    const kcpObject = new KCP(123, context);
    kcpObject.stream(1);
    kcpObject.nodelay(0, delay, 0, 0);
    kcpObject.output(outputCallback);
    clients[clientKey] = kcpObject;
  }

  const kcpObject = clients[clientKey];
  kcpObject.input(buf);
  const recv = kcpObject.recv();
  if (recv) {
    const recvStr = recv.toString();
    const { address, port } = kcpObject.context();
    console.log(`Server receive ${recvStr} from ${address}:${port}`);
    kcpObject.send(`Server echo ${recvStr}`);
  }
});

server.on("listening", () => {
  const { address, port } = server.address();
  console.log(`Server is listening on ${address}:${port}`);
  setInterval(() => {
    for (const clientKey in clients) {
      const kcpObject = clients[clientKey];
      kcpObject.update(Date.now());
    }
  }, delay);
});

server.bind(41234);
