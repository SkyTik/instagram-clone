import { useEffect, useState } from "react";
import useShowToast from "./useShowToast.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase.js";
import userProfileStore from "../store/userProfileStore.js";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = userProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username),
        );
        const qSnapshot = await getDocs(q);

        if (qSnapshot.empty) {
          return setUserProfile(null);
        }

        const userDoc = qSnapshot.docs[0].data();
        setUserProfile(userDoc);
      } catch (e) {
        showToast("ERROR", e.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
