import { useState, createContext } from "react";
import { signIn, signUp } from "./auth.service";
import { fetchUserProfile } from "./user.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const firebaseUser = await signIn(email, password);
      // const token = await firebaseUser.user.getIdToken();
      const profile = await fetchUserProfile(firebaseUser.user.uid);
      setUser({
        uid: firebaseUser.user.uid,
        firebaseEmail: firebaseUser.user.email,
        ...profile,
      });
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
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onSignUp,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
