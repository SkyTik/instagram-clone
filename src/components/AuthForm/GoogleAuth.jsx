import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase.js";
import useShowToast from "../../hooks/useShowToast.js";
import useAuthStore from "../../store/authStore.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        return showToast("ERROR", error.message, "error");
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnapshot = await getDoc(userRef);

      let userDocument;
      if (userSnapshot.exists()) {
        userDocument = userSnapshot.data();
      } else {
        userDocument = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
      }

      localStorage.setItem("user-info", JSON.stringify(userDocument));
      loginUser(userDocument);
    } catch (e) {
      return showToast("ERROR", e.message, "error");
    }
  };

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => handleGoogleAuth()}
        cursor={"pointer"}
      >
        <Image src={"/google.png"} w={5} alt={"Google Logo"} />
        <Text mx={2} color={"blue.500"}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
