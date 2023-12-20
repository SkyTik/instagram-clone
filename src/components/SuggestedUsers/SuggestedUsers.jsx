import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers.js";
import SuggestedHeader from "./SuggestedHeader.jsx";
import SuggestedUser from "./SuggestedUser.jsx";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          color={"gray.500"}
          cursor={"pointer"}
        >
          See all
        </Text>
      </Flex>
      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"center"}>
        @ Cloned by{" "}
        <Link
          href={"https://www.linkedin.com/in/vunh/"}
          target={"_blank"}
          color={"blue.500"}
          fontSize={14}
        >
          SkyTik
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
