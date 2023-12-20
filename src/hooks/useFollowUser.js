import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase.js";
import useAuthStore from "../store/authStore.js";
import useUserProfileStore from "../store/userProfileStore.js";
import useShowToast from "./useShowToast.js";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { user: authUser, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });
      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        setUser({
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        });

        setUserProfile({
          ...userProfile,
          followers: userProfile.followers.filter((uid) => uid !== userId),
        });
        console.log(userProfile);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          }),
        );
        setIsFollowing(false);
      } else {
        setUser({
          ...authUser,
          following: [...authUser.following, userId],
        });
        setUserProfile({
          ...userProfile,
          followers: [...userProfile.followers, userId],
        });
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          }),
        );
        setIsFollowing(true);
      }
    } catch (e) {
      showToast("ERROR", e.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
