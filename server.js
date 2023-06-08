const http = require("http");
const app = require("./app");

const port = process.env.port || 3005;
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server Start");
});
