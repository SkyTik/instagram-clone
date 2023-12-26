import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase.js";
import usePostStore from "../store/postStore.js";
import useUserProfileStore from "../store/userProfileStore.js";
import useShowToast from "./useShowToast.js";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const { userProfile } = useUserProfileStore();

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;

      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid),
        );
        const qSnapshot = await getDocs(q);
        const posts = qSnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (e) {
        showToast("ERROR", e.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;
