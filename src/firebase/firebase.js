import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfvAaskm89Mfd19Oqhy_23QIeeSgguN-A",
  authDomain: "instagram-clone-8a8f1.firebaseapp.com",
  projectId: "instagram-clone-8a8f1",
  storageBucket: "instagram-clone-8a8f1.appspot.com",
  messagingSenderId: "801710412030",
  appId: "1:801710412030:web:10b37481c82c468770d5af",
  measurementId: "G-CC80D6ZGHF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
