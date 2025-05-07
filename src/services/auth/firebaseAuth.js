import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgr5D2RkeFq8Cj7rTNpIi2YUQT6XvUw-0",
  authDomain: "cansandgo-bf848.firebaseapp.com",
  projectId: "cansandgo-bf848",
  storageBucket: "cansandgo-bf848.firebasestorage.app",
  messagingSenderId: "813424171043",
  appId: "1:813424171043:web:aa3aba163ac926a2e5f996",
  measurementId: "G-NFPDNQXXSY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
