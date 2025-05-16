import { useState, createContext, useEffect } from "react";
import { signIn, signUp } from "./auth.service";
import { fetchUserProfile } from "./user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "../places/places-api-url";
import { Alert } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const firebaseUser = await signIn(email, password);
      const profile = await fetchUserProfile(firebaseUser.user.uid);
      setUser({
        ...profile,
      });
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUp = async (email, password) => {
    setIsLoading(true);
    try {
      const newUser = await signUp(email, password);
      setUser(newUser.user);
      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(newUser.user)
      );
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      Alert.alert("Logout Successfull", "Hope to see you again soon!");
    } catch (e) {
      Alert.alert("An Error Occured", "Please try again Later!");
      console.log("Logout error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log("Error loading user from storage:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onSignUp,
        setUser,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
