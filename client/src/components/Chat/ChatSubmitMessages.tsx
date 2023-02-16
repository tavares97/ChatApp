import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface ChatSubmitMessagesProps {
  socket: Socket;
  username: string;
  room: string;
}

const ChatSubmitMessages: React.FC<ChatSubmitMessagesProps> = ({
  socket,
  username,
  room,
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };
  return (
    <Flex w="full" p={8} gap="8">
      <Input
        placeholder="Your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button px={{ base: 5, md: 10 }} onClick={sendMessage}>
        Send
      </Button>
    </Flex>
  );
};

export default ChatSubmitMessages;
