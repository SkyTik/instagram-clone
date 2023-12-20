import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase.js";
import useAuthStore from "../store/authStore.js";
import useShowToast from "./useShowToast.js";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user } = useAuthStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        // const userRef = ;
        const q = query(
          collection(firestore, "users"),
          where("uid", "not-in", [user.uid, ...user.following]),
          orderBy("uid"),
          limit(3),
        );
        const qSnapshot = await getDocs(q);
        const suggestedUsers = qSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSuggestedUsers(suggestedUsers);
      } catch (e) {
        showToast("ERROR", e.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getSuggestedUsers();
  }, [user, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
