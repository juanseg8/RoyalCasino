// src/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // URL de tu cliente
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Exporta io para su uso en otros archivos
module.exports = { app, server, io };

const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://juanseg:4HZEognnsjd2RlIT@cluster0.298ecga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Configurar socket.io
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`Usuario ${userId} se ha unido a su sala`);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Routes
const userRouter = require("./routes/user");
app.use("/api", userRouter);

const gameSettingsRouter = require("./routes/gameSettings");
app.use("/api", gameSettingsRouter);

const gamesRouter = require("./routes/games");
app.use("/api/games", gamesRouter);

server.listen(PORT, () =>
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
);
