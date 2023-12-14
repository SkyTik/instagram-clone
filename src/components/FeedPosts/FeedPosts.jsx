import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";
import { useEffect, useState } from "react";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"start"}>
                <Skeleton h={"10px"} w={"200px"} />
                <Skeleton h={"10px"} w={"100px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}></Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && (
        <>
          <FeedPost
            img={"/img1.png"}
            username={"SkyTik"}
            avatar={"/img1.png"}
          />
          <FeedPost
            img={"/img2.png"}
            username={"CordisDie"}
            avatar={"/img2.png"}
          />
          <FeedPost
            img={"/img3.png"}
            username={"SkyTik"}
            avatar={"/img3.png"}
          />
          <FeedPost
            img={"/img4.png"}
            username={"CordisDie"}
            avatar={"/img4.png"}
          />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
