const dotenv = require("dotenv").config();
const express = require("express");
const { postMessage } = require("./utils/Telegram");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allRouter = require("./routes/allRoutes");
const connect = require("./config/db");
const { createServer } = require("http");
const { Server } = require("socket.io");

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", allRouter);
app.use(cookieParser());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("socketio", io);

app.post("/get_msg", async (req, res) => {
  console.log("req body", req.body);
  socket = app.get("socketio");
  const messageData = {
    body: req.body,
    chat_id: req.body.message.chat.id,
  };

  await postMessage({
    socket,
    body: req.body,
    chat_id: req.body.message.chat.id,
    text: "Hello sataru",
  });

  socket.emit("message", messageData);
  res.send("Hello Post");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("id of socket", socket.id);
});

server.listen(PORT, async () => {
  try {
    await connect();
    console.log("Server is running on port " + PORT);
  } catch (error) {
    console.log(error);
  }
});
