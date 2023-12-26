import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { CreatePostLogo } from "../../assets/constants";
import { firestore, storage } from "../../firebase/firebase.js";
import usePreviewImg from "../../hooks/usePreviewImg.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import usePostStore from "../../store/postStore.js";
import useUserProfileStore from "../../store/userProfileStore.js";

const CreatePost = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const showToast = useShowToast();

  const [caption, setCaption] = useState("");

  const imageRef = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg();

  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (e) {
      showToast("ERORR", e.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
              onClick={() => imageRef.current.click()}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt={"Selected Image"} />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => setSelectedFile("")}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user: authUser } = useAuthStore();
  const { createPost } = usePostStore();
  const { addPost } = useUserProfileStore();

  const handleCreatePost = async (selectedFile, caption) => {
    if (!selectedFile) {
      throw new Error("Please select an image!");
    }
    setIsLoading(true);

    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imgRef = ref(storage, `posts/${postDocRef.id}`);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imgRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imgRef);
      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      createPost({ ...newPost, id: postDocRef.id });
      addPost({ ...newPost, id: postDocRef.id });

      showToast("SUCCESS", "Post is created!", "success");
    } catch (e) {
      showToast("ERROR", e.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
