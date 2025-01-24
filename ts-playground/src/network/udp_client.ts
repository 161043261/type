import dgram from "node:dgram";
import readline from "node:readline";

const client = dgram.createSocket("udp4");
// const message = Buffer.from("Ping, ping, ping");

// const serverIP = "121.41.121.204";
const serverIP = '192.168.0.65'
const port = 24642;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question("Enter message: ", (input) => {
    if (input === "q" || input === "Q") {
      rl.close();
      client.close();
      return;
    }
    const msg = Buffer.from(input);
    client.send(msg, port, serverIP, (err, bytes) => {
      if (err) {
        console.error(err);
      }
      if (bytes === 0) {
        console.warn("No bytes sent");
      }
    });
  });
}

client.on("message", (msg, rinfo) => {
  console.log(`Rx from ${rinfo.address}:${rinfo.port}, msg: ${msg}`);
  prompt();
});

client.on("error", (err) => {
  console.error(`Client error: ${err.stack}`);
  rl.close();
  client.close();
});

client.on("listening", () => {
  const addr = client.address();
  console.log(`Listening for UDP packets from ${addr.address}:${addr.port}`);
});

client.bind(0, () => {
  const addr = client.address();
  console.log(`Binding on ${addr.address}:${addr.port}`);

  client.send("ping", port, serverIP, (err, bytes) => {
    if (err) {
      console.error(err);
    }
    if (bytes === 0) {
      console.warn("No bytes sent");
    }
  });
});
