import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../firebase/firebase.js";
import useShowToast from "./useShowToast.js";

const useSeaarchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);

    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username),
      );
      const qSnapshot = await getDocs(q);
      if (qSnapshot.empty) {
        return showToast("ERROR", "User not found!", "error");
      }

      setUser(qSnapshot.docs[0].data());
    } catch (e) {
      showToast("ERROR", e.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSeaarchUser;
