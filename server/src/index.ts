import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Chat } from "../model/model";

dotenv.config();
const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!);
const db = mongoose.connection;

app.use(cors());

const server = createServer(app);

db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("Database Connected");
});

/* Setting up the server to accept requests from the client. */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers: any = [];

/* Listening for a connection from the client. */
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  /* Listening for a join_room event from the client. */
  socket.on("join_room", async (data) => {
    const { username, room } = data;

    socket.join(room);

    // te.map((message: any) => {
    //   if (message.room === room) {
    //     socket.emit("last_100_messages", message);
    //   }
    // });

    Chat.find({}, (__: any, te: any) => {
      socket.emit("last_100_messages", te);
    })
      .clone()
      .exec();

    let __createdtime__ = new Date(Date.now());
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // Send welcome msg to user that just joined chat only
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user: any) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    //GETS THE SENT MESSAGE AND SAVES IT TO THE DATABASE
    socket.on("send_message", async (data) => {
      try {
        const { message, username, room, __createdtime__ } = data;
        io.in(room).emit("receive_message", data); // Send to all users in room, including sender
        const newData = new Chat({
          username,
          message,
          room,
          __createdtime__,
        });

        await newData.save();
      } catch (error) {
        console.error(error);
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
