import camelize from "camelize";
import { mockImages, mocks } from "./mock";
import { API_URL } from "./places-api-url";
import { Alert } from "react-native";

export const placeRequest = (place) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[place];
    if (!mock) reject("Cannot find this place");
    resolve(mock);
  });
};

export const fetchAllPlaces = async () => {
  // try {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw (
      new Error(errorData.error) ||
      "Something went wrong, please relod the application"
    );
  }
  const places = await response.json();

  return places;
  // } catch (error) {
  //   console.error("Error:", error);
  //   // Alert.alert("Error", error.message);
  //   return [];
  // }
};

export const placeTransform = ({ results = [] }) => {
  const mappedResults = results.map((place) => {
    place.photos = [mockImages[Math.floor(Math.random() * mockImages.length)]];
    return {
      ...place,
      isClosedTemporarely: place.business_status === "CLOSED_TEMPORARILY",
      isOpenNow: place.opening_hours && place.opening_hours.open_now,
      address: place.vicinity,
    };
  });

  return camelize(mappedResults);
};

export const submitPlace = async ({
  title,
  description,
  imageUrl,
  features,
  location,
}) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        features,
        location,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit place");
    }

    const data = await response.json();
    Alert.alert("Success", "Place submitted successfully!");
    return data;
  } catch (error) {
    console.error("Submission error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};
