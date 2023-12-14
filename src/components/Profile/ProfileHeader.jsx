import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

const ProfileHeader = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"start"}
        mx={"auto"}
      >
        <Avatar
          name={"SkyTik"}
          src={
            "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/357694104_6666355803486879_2479394999745201163_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHlKiUYi_uB8BqylQZEgpI4Sqnu3wx29xxKqe7fDHb3HHijt1wci27F3LVRkcrGGl00ef1MzdOMw0v0oD6qTP2z&_nc_ohc=RBBLDXqSzLEAX90borc&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBjtzuZwH1bJGJmofbsMkqok4cnEy3CXhLi2xRtZVmUUQ&oe=657F4A03"
          }
          alt={"SkyTik"}
        />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>SkyTik_</Text>

          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button
              bg={"white"}
              color={"black"}
              _hover={{ bg: "whiteAlpha.800" }}
              size={{ base: "xs", md: "sm" }}
            >
              Edit profile
            </Button>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              4
            </Text>
            Posts
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              9999
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              9999
            </Text>
            Followings
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={"bold"}>
            SkyTik
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={{ base: "xs", md: "sm" }}>SkyTik is a developer</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
