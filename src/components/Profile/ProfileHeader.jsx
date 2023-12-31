import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser.js";
import useAuthStore from "../../store/authStore.js";
import useUserProfileStore from "../../store/userProfileStore.js";
import EditProfile from "./EditProfile.jsx";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  console.log(userProfile);

  const { user: authUser } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const visitOwnProfile =
    authUser && authUser.username === userProfile.username;
  const visitAnotherProfile =
    authUser && authUser.username !== userProfile.username;

  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    userProfile.uid,
  );

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
          name={userProfile.username}
          src={userProfile.profilePicURL}
          alt={userProfile.username}
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
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>
          {visitOwnProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit profile
              </Button>
            </Flex>
          )}
          {visitAnotherProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.700" }}
                size={{ base: "xs", md: "sm" }}
                isLoading={isUpdating}
                onClick={handleFollowUser}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            Followings
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={{ base: "xs", md: "sm" }}>{userProfile.bio}</Text>
        </Flex>
      </VStack>

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
