import camelize from "camelize";
import { locations } from "./location.mock";
import { SEARCH_URL } from "../places/places-api-url";

export const locationRequest = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const locationMock = locations[searchTerm];
    if (!locationMock) reject("Cannot find this location");
    resolve(locationMock);
  });
};

export const locationTransform = (result) => {
  const formattedResult = camelize(result);
  const { geometry = {} } = formattedResult.results[0];
  const { lat, lng } = geometry.location;
  const viewport = geometry.viewport;

  return { lat, lng, viewport };
};

export const searchRequest = async (searchTerm) => {
  const response = await fetch(
    `${SEARCH_URL}?query=${encodeURIComponent(searchTerm)}`
  );
  if (!response.ok) {
    if (response.status === 400) {
      return { lat: null, lng: null, viewport: null };
    }
    const errorData = await response.json();
    throw (
      new Error(errorData.error) ||
      "Something went wrong, please relod the application"
    );
  }
  const data = await response.json();

  console.log(data);
  return data;
};
