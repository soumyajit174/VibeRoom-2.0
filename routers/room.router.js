import express from "express";
import { createUser, joinRoom } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/create", (req, res) => {
  res.render("signin");   // loads signin.ejs
});

router.post("/create", createUser);
router.post("/join-room", joinRoom);

router.get("/chat/:roomKey", (req, res) => {
  const { roomKey } = req.params;
  // For now render a simple chat placeholder page
  res.render("chat", { roomKey });
});
// // Render chat room
// router.get("/chat", (req, res) => {
//   // You can pass a dummy username for now
//   res.render("chat", { username: "Guest" });
// });


export default router;
