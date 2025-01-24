//! sudo tcpdump -c 10 -Z root -i any udp
//! scp ./udp_remote_proxy.ts root@121.41.121.204:/root/proxy/proxy.ts
import dgram from "node:dgram";

// TODO Multicast
const port = 24642;
const rsockets = new Set<string>();

const listener = dgram.createSocket("udp4");
const forwarder = dgram.createSocket("udp4");

listener.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  const rsocket = `${rinfo.address}:${rinfo.port}`;
  console.log(`Rx from: ${rsocket}, msg: ${msg}`);
  if (!rsockets.has(rsocket)) {
    rsockets.add(rsocket);
    console.log(`Add ${rsocket} to rsockets`);
  }
  for (const rsocket of rsockets) {
    forwarder.send(
      msg, // msg: string | Uint8Array
      0, // offset: number
      msg.length, // length: number
      // Number.parseInt(rsocket.split(":")[1]), // port?: number
      55555,
      rsocket.split(":")[0], // address?: string
      (err: Error | null, bytes: number) => {
        if (err) {
          console.error("Proxy error:", err);
          rsockets.delete(rsocket);
          console.log(`Delete ${rsocket} from rsockets`);
        }
        if (bytes === 0) {
          console.warn("No bytes forwarded");
        }
      }, // callback?: (error: Error | null, bytes: number) => void
    );
  }
});

listener.on("listening", () => {
  const addr = listener.address();
  console.log(`Listening for UDP packets from ${addr.address}:${addr.port}`);
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

forwarder.bind(0, () => {
  const addr = forwarder.address();
  console.log(`Forwarder binding on ${addr.address}:${addr.port}`);
});
