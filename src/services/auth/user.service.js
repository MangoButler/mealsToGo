import { Alert } from "react-native";
import { uploadImage } from "../../utils/cloudinary-functions";
import { PROFILE_UPLOAD_PRESET, USER_URL } from "../places/places-api-url";
import { getIdTokenFromFirebase, updateFirebaseProfile } from "./auth.service";
import { auth } from "./firebaseAuth";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUserProfile = async ({
  uid,
  email,
  username,
  favoriteDrink,
  country,
  profilePicture,
}) => {
  try {
    const token = await getIdTokenFromFirebase();

    let profileImageUrl = null;

    // Upload image if provided
    if (profilePicture && profilePicture.length) {
      profileImageUrl = await uploadImage(
        profilePicture,
        PROFILE_UPLOAD_PRESET
      );

      if (!profileImageUrl) {
        Alert.alert(
          "Image Upload Failed",
          result.message || "Something went wrong."
        );
        return null; // Image upload failed
      }
    }

    const payload = {
      uid,
      email,
      username,
      favoriteDrink,
      country,
      profilePicture: profileImageUrl,
    };

    const response = await fetch(USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Backend error:", result);
      Alert.alert(
        "Profile Creation Failed",
        result.message || "Something went wrong."
      );
      return null;
    }

    const newProfile = result.profile;

    // const newUserProfile =
    await updateFirebaseProfile(newProfile.username, newProfile.profilePicture);
    Alert.alert(
      "Welcome to the club!",
      "Share your favorite spots in the city and see what others are doing!"
    );

    return newProfile;
  } catch (error) {
    console.error("Unexpected error:", error);
    Alert.alert(
      "Error",
      "An unexpected error occurred while creating the profile."
    );
    return null;
  }
};

export const updateUserProfile = async ({
  newUsername,
  newFavoriteDrink,
  newCountry,
  newProfilePicture,
  user,
}) => {
  try {
    const token = await getIdTokenFromFirebase();

    let secure_url = user.profilePicture;
    if (newProfilePicture && newProfilePicture !== user.profilePicture) {
      secure_url = await uploadImage(newProfilePicture, PROFILE_UPLOAD_PRESET);
    }

    const payload = {
      username: newUsername || user.username,
      favoriteDrink: newFavoriteDrink || user.favoriteDrink,
      country: newCountry || user.country,
      profilePicture: secure_url,
    };

    const response = await fetch(`${USER_URL}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update profile");
    }

    const data = await response.json();
    const updatedProfile = data.profile;
    Alert.alert("Success", "Profile updated successfully!");
    return updatedProfile;
  } catch (error) {
    console.error("Editing error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const fetchUserProfile = async () => {
  try {
    const token = await getIdTokenFromFirebase();

    const response = await fetch(`${USER_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        console.log("No user corresponding to fb token.");
        return null;
      }
      throw new Error(result.error || "Failed to fetch user profile");
    }
    return result.profile;
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null;
  }
};

export const deleteUserProfile = async (setUser, password) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No authenticated user found.");
    }

    // Re-authenticate
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    await reauthenticateWithCredential(currentUser, credential);

    const token = await currentUser.getIdToken(true);

    const response = await fetch(`${USER_URL}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete profile");
    }

    await deleteUser(currentUser);

    await AsyncStorage.removeItem("USER_STORAGE_KEY");
    await AsyncStorage.removeItem("LAST_SYNC_KEY");

    setUser(null);

    Alert.alert("Success", "Your account has been deleted.");
    return true;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    Alert.alert("Error", error.message || "Something went wrong.");
    return false;
  }
};

// export const deleteUserProfile = async () => {
//   try {
//     const token = getIdTokenFromFirebase();

//     const response = await fetch(`${USER_URL}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to delete profile");
//     }

//     const data = await response.json();
//     const deletedProfile = data.profile;
//     Alert.alert("Success", "Profile deleted successfully!");
//     return deletedProfile;
//   } catch (error) {
//     console.error("Deleting error:", error);
//     Alert.alert("Error", error.message);
//     return null;
//   }
// };

// export const updateUserProfile = async ({
//   newUsername,
//   newFavoriteDrink,
//   newCountry,
//   newProfilePicture,
//   user,
// }) => {
//   try {
//     let secure_url = user.profilePicture;
//     if (newProfilePicture && newProfilePicture !== user.profilePicture) {
//       secure_url = await uploadImage(newProfilePicture, PROFILE_UPLOAD_PRESET);
//     }

//     const payload = {
//       username: newUsername || user.username,
//       favoriteDrink: newFavoriteDrink || user.favoriteDrink,
//       country: newCountry || user.country,
//       profilePicture: secure_url,
//     };

//     const response = await fetch(`${USER_URL}/${user.firebaseId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to update profile");
//     }

//     const data = await response.json();
//     const updatedProfile = data.profile;
//     Alert.alert("Success", "Profile updated successfully!");
//     return updatedProfile;
//   } catch (error) {
//     console.error("Editing error:", error);
//     Alert.alert("Error", error.message);
//     return null;
//   }
// };

// export const fetchUserProfile = async (uid) => {
//   try {
//     const response = await fetch(`${USER_URL}/${uid}`); //and here bread
//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(result.error || "Failed to fetch user profile");
//     }
//     return result.profile;
//   } catch (error) {
//     console.error("Error fetching user profile", error);
//     return null;
//   }
// };
