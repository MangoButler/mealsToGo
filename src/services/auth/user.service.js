import { Alert } from "react-native";
import { uploadImage } from "../../utils/cloudinary-functions";
import { PROFILE_UPLOAD_PRESET, USER_URL } from "../places/places-api-url";
import { updateFirebaseProfile } from "./auth.service";

export const createUserProfile = async ({
  uid,
  email,
  username,
  favoriteDrink,
  country,
  profilePicture,
}) => {
  try {
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

    const response = await fetch(`${USER_URL}/${user.firebaseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to edit place");
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

export const fetchUserProfile = async (uid) => {
  try {
    const response = await fetch(`${USER_URL}/${uid}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch user profile");
    }
    return result.profile;
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null;
  }
};
