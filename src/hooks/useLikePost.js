import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

import { firestore } from "../firebase/firebase.js";
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";

const UseLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const { user: authUser } = useAuthStore();
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));

  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser)
      return showToast(
        "ERROR",
        "You must be logged in to like a post!",
        "error",
      );

    setIsUpdating(true);

    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (e) {
      showToast("ERROR", e.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, isUpdating, handleLikePost };
};

export default UseLikePost;
