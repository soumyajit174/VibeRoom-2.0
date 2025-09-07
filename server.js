// server.js
import express from "express"; 
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomRouter from "./routers/room.router.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.mbi || 'mongodb://127.0.0.1:27017/ChatAPP';

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/room", roomRouter);

// Simple root redirect to signin
app.get("/", (req, res) => {
  res.redirect("/room/create");
});

// --- ✅ Socket.IO Setup ---
const server = createServer(app); // create HTTP server
const io = new Server(server);    // attach Socket.IO

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When client sends a chat message
  socket.on("chatMessage", ({ username, message }) => {
    // console.log(`${username}: ${message}`);
    // Broadcast to all clients (including sender)
    io.emit("message", { user: username, text: message });
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --- Start server with Socket.IO ---
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/room/create`);
});
