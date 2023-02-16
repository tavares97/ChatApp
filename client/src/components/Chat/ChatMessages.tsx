import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatMessagesProps {
  socket: Socket;
}

type MessageReceived = {
  message: string;
  username: string;
  __createdtime__: string;
}[];

const ChatMessages: React.FC<ChatMessagesProps> = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState<MessageReceived>([]);
  const messagesColumnRef = useRef<HTMLInputElement>(null);

  /**
   * Listening for a socket event called "receive_message" and then updating the state of
   * messagesReceived with the data from the socket event.
   *  Runs whenever a socket event is received from the server
   */
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);

      socket.on("last_100_messages", (last100Messages) => {
        setMessagesReceived((state) => [...last100Messages, ...state]);
      });
    });

    // Remove event listener on component unmount
    return () => {
      socket.off("receive_message");
      socket.off("last_100_messages");
    };
  }, [socket]);

  const formatDateFromTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString("pt-PT");
  };

  return (
    <Box p={8} ref={messagesColumnRef} overflow="auto" height="90vh">
      {messagesReceived.map((msg: any, i: number) => (
        <Box
          p={3}
          rounded="md"
          boxShadow="lg"
          bg="whiteAlpha.100"
          key={i}
          mb={3}
        >
          <Flex justify="space-between">
            <Text>{msg.username}</Text>
            <Text>{formatDateFromTimestamp(msg.__createdtime__)}</Text>
          </Flex>

          <Text my={3}>{msg.message}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;
