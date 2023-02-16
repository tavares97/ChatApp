import { ChangeEvent, Dispatch, SetStateAction } from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
}

const Home: React.FC<HomeProps> = ({
  username,
  setUsername,
  room,
  setRoom,
  socket,
}) => {
  /* It's a hook that allows us to navigate to a different page. */
  const navigate = useNavigate();

  /**
   * When the user writes a username, set the username state to the value of the written value.
   * @param e - ChangeEvent<HTMLInputElement>
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  /**
   * When the user selects a room, set the room state to the value of the selected room.
   * @param e - ChangeEvent<HTMLSelectElement>
   */
  const onRoomSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  };

  /**
   * When the user clicks the join button, we check if the username and room are empty. If they are, we
   * show an error message. If they aren't, we emit a join_room event to the server and navigate to the
   * chat page
   * @returns The return is the JSX that will be rendered on the page.
   */
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }

    // Redirect to /chat
    navigate("/chat", { replace: true });
  };

  return (
    <Flex height={"100vh"} justify="center">
      <Center flexDirection="column">
        <Box p={"16"} rounded="lg" bg="blackAlpha.600">
          <Heading bgGradient="linear(to-r, pink.500, blue.500)" bgClip="text">
            CHAT APP
          </Heading>

          <Input
            placeholder="Enter username"
            mt={8}
            mb={5}
            bg="blackAlpha.300"
            value={username}
            onChange={onInputChange}
          />

          <Select
            placeholder="Select option"
            variant="flushed"
            onChange={onRoomSelected}
          >
            <option value="javascript">Javascript</option>
            <option value="node">Node</option>
            <option value="react">React</option>
          </Select>

          <Button width="full" mt={8} onClick={joinRoom}>
            Join chat room
          </Button>
        </Box>
      </Center>
    </Flex>
  );
};

export default Home;
