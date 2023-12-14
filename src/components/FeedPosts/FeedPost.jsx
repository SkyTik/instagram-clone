import PostHeader from "./PostHeader.jsx";
import PostFooter from "./PostFooter.jsx";
import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const FeedPost = ({ img, username, avatar }) => {
  return (
    <>
      <PostHeader username={username} avatar={avatar} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt={username} />
      </Box>
      <PostFooter username={username} />
    </>
  );
};

export default FeedPost;
