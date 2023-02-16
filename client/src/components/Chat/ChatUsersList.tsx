import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

interface ChatUsersListProps {}

const ChatUsersList: React.FC<ChatUsersListProps> = ({}) => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      alignItems="center"
      height="100vh"
      py={5}
      px={{ base: 2, md: 5 }}
    >
      <Box>
        <Heading size="md">Room Name</Heading>
        <Text>Users List:</Text>
      </Box>

      <Button w="full">Leave Room</Button>
    </Flex>
  );
};

export default ChatUsersList;
