import net from 'node:net'
const htmlBody = '<h1>TCP Server</h1>'
const datagram = [
  'HTTP/1.1 200 OK',
  'Content-Type: text/html',
  `Content-Length: ${htmlBody.length}`,
  '\r\n',
  htmlBody
]

const server = net.createServer((socket) => {
  socket.on('data', (buf) => {
    if (/GET/.test(buf.toString())) {
      socket.write(datagram.join('\r\n'));
      socket.end();
    }
    console.log(buf.toString())
  })
})

server.listen(3333, () => {
  console.log("Serving on http://localhost:3333")
})