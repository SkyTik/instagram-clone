import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.js";
import useShowToast from "./useShowToast.js";

const UseLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      showToast("SUCCESS", "Logout", "success");
    } catch (e) {
      showToast("ERROR", error.message, "error");
    }
  };

  return { handleLogout, isLoggingOut, error };
};

export default UseLogout;
