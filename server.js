const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// app.get("/visuals1", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "visuals1/visuals1.html"));
// });

// app.get("/visuals2", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "visuals2/visuals2.html"));
// });

// app.get("/visuals-door", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "visualsDoor/visualsDoor.html"));
// });

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("start", () => {
    console.log("Start command received");
    io.emit("start"); // Broadcast to all connected clients
  });

  socket.on("stop", () => {
    console.log("stop command received");
    io.emit("stop"); // Broadcast to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
