import { Box, Flex } from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import ChatMessages from "./ChatMessages";
import ChatSubmitMessages from "./ChatSubmitMessages";
import ChatUsersList from "./ChatUsersList";

interface ChatWrapperProps {
  socket: Socket;
  username: string;
  room: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({
  socket,
  username,
  room,
}) => {
  return (
    <Flex maxH="100vh">
      <Box width={{ base: "30vw", md: "35vw" }}>
        <ChatUsersList />
      </Box>
      <Box width={{ base: "70vw", md: "65vw" }}>
        <ChatMessages socket={socket} />
        <ChatSubmitMessages socket={socket} username={username} room={room} />
      </Box>
    </Flex>
  );
};

export default ChatWrapper;
