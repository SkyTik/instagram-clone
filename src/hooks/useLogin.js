import useShowToast from "./useShowToast.js";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore.js";

const UseLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    try {
      if (!inputs.email || !inputs.password) {
        return showToast("ERROR", "Missing required fields!", "error");
      }
      const userCredential = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password,
      );
      if (userCredential) {
        const docRef = doc(firestore, "users", userCredential.user.uid);
        const docSnapshot = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnapshot.data()));
        loginUser(docSnapshot.data());
        // showToast("SUCCESS", "Login success!", "'success");
      }
    } catch (e) {
      return showToast("ERROR", error.message, "error");
    }
  };

  return { loading, error, login };
};

export default UseLogin;
