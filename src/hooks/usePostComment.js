import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase.js";
import useAuthStore from "../store/authStore.js";
import usePostStore from "../store/postStore.js";
import useShowToast from "./useShowToast.js";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const { user: authUser } = useAuthStore();
  const { addComment } = usePostStore();

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      showToast("ERROR", "You must be logged in to comment!!!", "error");

    setIsCommenting(true);
    const newComment = {
      comment,
      createdBy: authUser.uid,
      postId,
      createdAt: Date.now(),
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (e) {
      showToast("ERROR", e.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
