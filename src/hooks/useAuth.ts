import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";
import { profileStore, type TUser } from "../store/userStore";

interface TLoginFormData {
  email: string;
  password: string;
}

interface TSignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setFavorites, setWatchlist } = profileStore.getState();

  const login = async ({ email, password }: TLoginFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password)
        throw new Error("Email and password are required.");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      const userData: TUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        username: firebaseUser.displayName || firebaseUser.email!.split("@")[0]
      };
      setUser(userData);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Login error.";

      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({
    email,
    password,
    confirmPassword
  }: TSignupFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (password !== confirmPassword)
        throw new Error("Passwords do not match.");
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters.");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      const userData: TUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        username: email.split("@")[0]
      };
      setUser(userData);
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Registration error.";

      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFavorites([]);
      setWatchlist([]);
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Error during logout.";

      setError(msg);
    }
  };

  return { login, register, logout, isLoading, error };
};
