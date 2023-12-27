import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase.js";
import useAuthStore from "../store/authStore.js";
import usePostStore from "../store/postStore.js";
import useUserProfileStore from "../store/userProfileStore.js";
import useShowToast from "./useShowToast.js";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const { user: authUser } = useAuthStore();
  const { setUserProfile } = useUserProfileStore();

  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }

      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "in", authUser.following),
        );
        const qSnapshot = await getDocs(q);
        const feedPosts = qSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setPosts(feedPosts);
      } catch (err) {
        showToast("ERROR", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, setPosts, setUserProfile, showToast]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
