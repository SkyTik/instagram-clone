import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase.js";

import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";

const UseSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);

  const signUp = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.username ||
      !inputs.password ||
      !inputs.fullName
    ) {
      showToast("ERROR", "Missing required fields!", "error");
      return;
    }

    // Check duplicate username
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      showToast("ERROR", "username is existed!", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password,
      );
      if (!newUser && error) {
        showToast("ERROR", error.message, "error");
        return;
      }

      const userDocument = {
        uid: newUser.user.uid,
        email: inputs.email,
        username: inputs.username,
        fullName: inputs.fullName,
        bio: "",
        profilePicURL: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
      localStorage.setItem("user-info", JSON.stringify(userDocument));
      loginUser(userDocument);
    } catch (e) {
      showToast("ERROR", error.message, "error");
    }
  };

  return { loading, error, signUp };
};

export default UseSignUpWithEmailAndPassword;
