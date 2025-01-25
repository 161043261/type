//! sudo tcpdump -c 10 -Z root -i any udp
import dgram from "node:dgram";
import { Buffer } from "node:buffer";

const port = 24642;
const remoteSockets = new Set<string>();

const listener = dgram.createSocket("udp4");
const forwarder = dgram.createSocket("udp4");

listener.on("listening", () => {
  const socket = listener.address();
  console.log(
    `Listening for UDP packets from ${socket.address}:${socket.port}`,
  );
});

listener.on("message", (msg: Buffer, remoteInfo: dgram.RemoteInfo) => {
  const remoteSocket = `${remoteInfo.address}:${remoteInfo.port}`;
  console.log(`Rx from: ${remoteSocket}, msg: ${msg}`);
  if (!remoteSockets.has(remoteSocket)) {
    remoteSockets.add(remoteSocket);
    console.log(`Add ${remoteSocket} to remote sockets`);
  }
  for (const socket of remoteSockets) {
    forwarder.send(
      msg.toString(), // msg: string | Uint8Array
      Number.parseInt(socket.split(":")[1]), // port?: number
      socket.split(":")[0], // address?: string
      (err: Error | null, bytes: number) => {
        if (err) {
          console.error("Proxy error:", err);
          remoteSockets.delete(socket);
          console.log(`Delete ${socket} from remote sockets`);
        }
        if (bytes === 0) {
          console.warn("No bytes forwarded");
        }
      }, // callback?: (error: Error | null, bytes: number) => void
    );
  }
});

listener.on("error", (err) => {
  console.error(`Server error: ${err.stack}`);
  listener.close();
});

listener.bind(
  port, // Specified port 24642
  () => {
    const addr = listener.address();
    console.log(`Listener binding on ${addr.address}:${addr.port}`);
  },
);

listener.on("listening", () => {
  const socket = listener.address();
  console.log(
    `Listening for UDP packets from ${socket.address}:${socket.port}`,
  );
  console.log("Copyright (c) tianchenghang.github.io");
  console.log("All rights reserved");
});

forwarder.bind(
  0, // Random port
  () => {
    const addr = forwarder.address();
    console.log(`Forwarder binding on ${addr.address}:${addr.port}`);
  },
);
