const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//IO Socket Commands
io.on("connection", (socket) => {
  console.log("A new user has joined" + socket.id);
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Listening on port }`));
