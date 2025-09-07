import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,   // which room the message belongs to
      required: true,
    },
    sender: {
      type: String,   // username or userId of sender
      required: true,
    },
    message: {
      type: String,   // chat message
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
