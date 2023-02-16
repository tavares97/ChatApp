import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  __createdtime__: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = mongoose.model("messages", chatSchema);
