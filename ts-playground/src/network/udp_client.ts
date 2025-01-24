import dgram from "node:dgram";
import readline from "node:readline";

// const serverAddr = "121.41.121.204";
const serverAddr = "192.168.0.65";
const port = 24642;

const listener = dgram.createSocket("udp4");
const sender = dgram.createSocket("udp4");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tx() {
  rl.question("Enter message: ", (input) => {
    if (input === "q" || input === "Q") {
      rl.close();
      sender.close();
      listener.close();
      return;
    }
    const msg = Buffer.from(input);
    sender.send(msg, port, serverAddr, (err, bytes) => {
      if (err) {
        console.error(err);
      }
      if (bytes === 0) {
        console.warn("No bytes sent");
      }
    });
  });
}

listener.on("listening", () => {
  const addr = listener.address();
  console.log(`Listening for UDP packets from ${addr.address}:${addr.port}`);
});

listener.on("message", (msg, rinfo) => {
  console.log(`Rx from ${rinfo.address}:${rinfo.port}, msg: ${msg}`);
  tx();
});

sender.on("error", (err) => {
  console.error(`Sender error: ${err.stack}`);
  rl.close();
  sender.close();
});

listener.bind(port, () => {
  const addr = listener.address();
  console.log(`Listener binding on ${addr.address}:${addr.port}`);
});

sender.bind(0, () => {
  const addr = sender.address();
  console.log(`Sender binding on ${addr.address}:${addr.port}`);
  sender.send("ping", port, serverAddr, (err, bytes) => {
    if (err) {
      console.error(err);
    }
    if (bytes === 0) {
      console.warn("No bytes sent");
    }
  });
});
