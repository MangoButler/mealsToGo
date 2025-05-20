import { useState, createContext, useEffect } from "react";
import { signIn, signUp } from "./auth.service";
import { fetchUserProfile } from "./user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LAST_SYNC_KEY, USER_STORAGE_KEY } from "../places/places-api-url";
import { Alert } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseAuth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children, onAuthReady }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const firebaseUser = await signIn(email, password);
      const profile = await fetchUserProfile();
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
      await signOut(auth);

      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await AsyncStorage.removeItem(LAST_SYNC_KEY);
      setUser(null);

      Alert.alert("Logout Successful", "Hope to see you again soon!");
    } catch (e) {
      Alert.alert("An Error Occurred", "Please try again later!");
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
    }
  };

  const syncUserProfile = async () => {
    try {
      const profile = await fetchUserProfile();
      if (!profile) return;
      setUser(profile);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
      await AsyncStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
    } catch (e) {
      console.log("Error syncing user profile:", e);
    }
  };

  const shouldSyncProfile = async () => {
    try {
      const lastSync = await AsyncStorage.getItem(LAST_SYNC_KEY);
      if (!lastSync) return true;
      const oneHourAgo = Date.now() - 3600 * 1000;
      return Number(lastSync) < oneHourAgo;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        await loadUserFromStorage();

        if (await shouldSyncProfile()) {
          await syncUserProfile();
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
        await AsyncStorage.removeItem(LAST_SYNC_KEY);
      }

      setIsLoading(false);
      if (onAuthReady) onAuthReady();
    });

    return unsubscribe;
  }, [onAuthReady]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     onAuthReady();
  //   }
  // }, [isLoading, onAuthReady]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     setIsLoading(true);
  //     if (firebaseUser) {
  //       try {
  //
  //         const profile = await fetchUserProfile();
  //         setUser(profile); // Or use firebaseUser directly if sufficient
  //         await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  //       } catch (error) {
  //         console.log("Error fetching user profile:", error);
  //       }
  //     } else {
  //       setUser(null);
  //       await AsyncStorage.removeItem(USER_STORAGE_KEY);
  //     }
  //     setIsLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

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
        setIsLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
