const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (so) => {
  console.log("user came");
  so.on("message", (msg) => {
    io.emit("message", msg);
  });
});

http.listen(3000, () => {
  console.log("server ready");
});
