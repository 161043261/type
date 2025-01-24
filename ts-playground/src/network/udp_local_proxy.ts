import dgram from "node:dgram";

// const serverAddr = "121.41.121.204";
const port = 24642;

const listener = dgram.createSocket("udp4");
const forwarder = dgram.createSocket("udp4");

listener.on("listening", () => {
  const addr = listener.address();
  console.log(`Listening for UDP packets from ${addr.address}:${addr.port}`);
});

listener.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  console.log(`Filtering address ${rinfo.address}`);
  // if (rinfo.address === serverAddr) {
  console.log(
    `Rx from ${rinfo.address}:${rinfo.port}, msg: ${msg}, forward to localhost:${port}`,
  );
  forwarder.send(msg, port, "127.0.0.1", (err: Error | null, bytes: number) => {
    if (err) {
      console.error("Forward err:", err);
    }
    if (bytes === 0) {
      console.warn("No bytes forwarded");
    }
  });
  // }
});

forwarder.on("error", (err) => {
  console.error(`Forwarder error: ${err.stack}`);
  forwarder.close();
});

listener.bind(
  55555, // Actually not specified port
  () => {
    const addr = listener.address();
    console.log(`Listener binding on ${addr.address}:${addr.port}`);
  },
);

forwarder.bind(0, () => {
  const addr = forwarder.address();
  console.log(`Forwarder binding on ${addr.address}:${addr.port}`);
});
