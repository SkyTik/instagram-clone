import { Container, Flex } from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader.jsx";
import ProfileTabs from "../../components/Profile/ProfileTabs.jsx";
import ProfilePosts from "../../components/Profile/ProfilePosts.jsx";

const ProfilePage = () => {
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        maxW={"full"}
        mx={"auto"}
        direction={"column"}
      >
        <ProfileHeader />
      </Flex>
      <Flex
        p={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;
