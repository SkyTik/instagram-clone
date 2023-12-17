import { Flex, Image, Text } from "@chakra-ui/react";

const GoogleAuth = () => {
  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Image src={"/google.png"} w={5} alt={"Google Logo"} />
        <Text mx={2} color={"blue.500"}>
          Login with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
