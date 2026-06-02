import type { User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import getAuthErrorMessage from "../utils/firebaseErrors";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData extends SignInData {
  fullName: string | undefined;
}

export const signUp = async (data: SignUpData) => {
  try {
    const { email, password, fullName } = data;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Update user profile with full name
    await updateProfile(userCredential.user, { displayName: fullName });
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError)
      throw new Error(getAuthErrorMessage(error.code), { cause: error });
    throw error;
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const { email, password } = data;
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredentials;
  } catch (error) {
    if (error instanceof FirebaseError)
      throw new Error(getAuthErrorMessage(error.code), { cause: error });
    throw error;
  }
};

export const onUserStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const signOut = async () => {
  await auth.signOut();
};
