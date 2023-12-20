import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { firestore, storage } from "../firebase/firebase.js";
import useAuthStore from "../store/authStore.js";
import useUserProfileStore from "../store/userProfileStore.js";
import useShowToast from "./useShowToast.js";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, setUser } = useAuthStore();
  const { setUserProfile } = useUserProfileStore();

  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !user) {
      return;
    }

    setIsUpdating(true);

    const userDocRef = doc(firestore, "users", user.uid);
    const storageRef = ref(storage, `profilePics/${user.uid}`);

    try {
      let URL = "";
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(storageRef);
      }

      const updatedUser = {
        ...user,
        fullName: inputs.fullName || user.fullName,
        username: inputs.username || user.username,
        bio: inputs.bio || user.bio,
        profilePicURL: URL || user.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setUserProfile(updatedUser);

      showToast("SUCCESS", "Profile's updated!", "success");
      setIsUpdating(false);
    } catch (e) {
      showToast("ERROR", e.message, "error");
    }
  };

  return { isUpdating, editProfile };
};

export default useEditProfile;
