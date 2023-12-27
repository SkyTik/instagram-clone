import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { firestore } from "../firebase/firebase.js";
import useShowToast from "./useShowToast.js";

const useGetUserProfileById = (userId) => {
  const [isFetching, setIsFetching] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsFetching(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (e) {
        showToast("ERROR", e.message, "error");
      } finally {
        setIsFetching(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId]);

  return { isFetching, userProfile, setUserProfile };
};

export default useGetUserProfileById;
