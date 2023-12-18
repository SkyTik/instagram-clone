import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout.js";
import useAuthStore from "../../store/authStore.js";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const user = useAuthStore((state) => state.user);
  console.log(user);

  if (!user) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${user.username}`}>
          <Avatar size={"lg"} src={user.profilePicURL} />
        </Link>
        <Link to={`${user.username}`}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user.username}
          </Box>{" "}
        </Link>
      </Flex>
      <Button
        size={"xs"}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        onClick={() => handleLogout()}
        isLoading={isLoggingOut}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
