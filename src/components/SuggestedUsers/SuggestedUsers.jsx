import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader.jsx";
import SuggestedUser from "./SuggestedUser.jsx";

const SuggestedUsers = () => {
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
      <SuggestedUser
        name={"Michael"}
        followers={1234}
        avatar={"https://bit.ly/dan-abramov"}
      />
      <SuggestedUser
        name={"SkyTik"}
        followers={9999}
        avatar={
          "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/357694104_6666355803486879_2479394999745201163_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHlKiUYi_uB8BqylQZEgpI4Sqnu3wx29xxKqe7fDHb3HHijt1wci27F3LVRkcrGGl00ef1MzdOMw0v0oD6qTP2z&_nc_ohc=RBBLDXqSzLEAX90borc&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBjtzuZwH1bJGJmofbsMkqok4cnEy3CXhLi2xRtZVmUUQ&oe=657F4A03"
        }
      />

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
