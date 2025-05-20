// import camelize from "camelize";
// import { mockImages, mocks } from "./mock";
import { PLACES_URL } from "./places-api-url";
import { Alert } from "react-native";
import { uploadImage } from "../../utils/cloudinary-functions";
import { getIdTokenFromFirebase } from "../auth/auth.service";

// export const placeRequest = (place) => {
//   return new Promise((resolve, reject) => {
//     const mock = mocks[place];
//     if (!mock) reject("Cannot find this place");
//     resolve(mock);
//   });
// };

// export const placeTransform = ({ results = [] }) => {
//   const mappedResults = results.map((place) => {
//     place.photos = [mockImages[Math.floor(Math.random() * mockImages.length)]];
//     return {
//       ...place,
//       isClosedTemporarely: place.business_status === "CLOSED_TEMPORARILY",
//       isOpenNow: place.opening_hours && place.opening_hours.open_now,
//       address: place.vicinity,
//     };
//   });

//   return camelize(mappedResults);
// };

export const fetchPlaces = async (searchTerm) => {
  //send the url with the query string and then implement the response

  const response = await fetch(
    searchTerm
      ? `${PLACES_URL}?query=${encodeURIComponent(searchTerm)}`
      : PLACES_URL
  );

  if (!response.ok) {
    if (response.status === 400) {
      return [];
    }
    const errorData = await response.json();
    throw (
      new Error(errorData.error) ||
      "Something went wrong, please relod the application"
    );
  }
  const places = await response.json();

  return places;
};

export const submitPlace = async ({
  title,
  description,
  imageUri,
  features,
  location,
  userId,
}) => {
  try {
    const token = await getIdTokenFromFirebase();

    const secureUrl = await uploadImage(imageUri);

    const response = await fetch(PLACES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl: secureUrl,
        features,
        location,
        userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit place");
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return { data, message: "Place submitted successfully!" };
  } catch (error) {
    console.error("Submission error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const editPlace = async ({
  title,
  description,
  imageUri,
  features,
  location,
  placeId,
  userId,
}) => {
  try {
    const token = await getIdTokenFromFirebase();

    const secureUrl = await uploadImage(imageUri);

    const response = await fetch(PLACES_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl: secureUrl,
        features,
        location,
        placeId,
        userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to edit place");
    }

    const data = await response.json();
    // Alert.alert("Success", "Place edited successfully!");
    return { data, message: "Place edited successfully!" };
  } catch (error) {
    console.error("Editing error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const deletePlace = async (placeId) => {
  try {
    const token = await getIdTokenFromFirebase();

    const response = await fetch(PLACES_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        placeId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete place");
    }

    const data = await response.json();
    // Alert.alert("Success", "Place deleted successfully!");
    return { data, message: "Place deleted successfully!" };
  } catch (error) {
    console.error("Deleting error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};
