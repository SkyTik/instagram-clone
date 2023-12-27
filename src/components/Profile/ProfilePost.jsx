import {
  Avatar,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { firestore, storage } from "../../firebase/firebase.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import usePostStore from "../../store/postStore.js";
import useUserProfileStore from "../../store/userProfileStore.js";
import Caption from "../Comment/Caption.jsx";
import Comment from "../Comment/Comment.jsx";
import PostFooter from "../FeedPosts/PostFooter.jsx";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile, deletePost: decrementPostsCount } =
    useUserProfileStore();
  const { user: authUser } = useAuthStore();
  const { deletePost } = usePostStore();
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const imgRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imgRef);

      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, { posts: arrayRemove(post.id) });

      deletePost(post.id);
      decrementPostsCount(post.id);

      showToast("SUCCESS", "Post is deleted!", "success");
    } catch (e) {
      showToast("ERROR", e.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={15}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <Flex>
                <FaComment size={20} />
                <Text fontWeight={"bold"} ml={2}>
                  {post.comments.length}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={post.imageURL}
          alt={"Profile's post"}
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt={"Profile's post"} />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfile?.profilePicURL} size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile?.fullName}
                    </Text>
                  </Flex>

                  {authUser?.uid === userProfile?.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      isLoading={isDeleting}
                      onClick={handleDeletePost}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                {/*Comments*/}
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxh={"350"}
                  overflowY={"auto"}
                >
                  {post?.caption && <Caption post={post} />}
                  {post.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter
                  post={post}
                  username={"SkyTik"}
                  isProfilePage={true}
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
