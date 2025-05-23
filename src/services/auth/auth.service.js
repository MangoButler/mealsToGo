import {
  createUserWithEmailAndPassword,
  reload,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseAuth";

export const signUp = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const updateFirebaseProfile = async (username, imageUrl) => {
  await updateProfile(auth.currentUser, {
    displayName: username,
    photoURL: imageUrl,
  });
  await reload(auth.currentUser);
  return auth.currentUser;
};

export async function getIdTokenFromFirebase() {
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  return token;
}
