import camelize from "camelize";
import { mockImages, mocks } from "./mock";

export const placeRequest = async (place = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[place];
    if (!mock) reject("Cannot find this place");
    resolve(mock);
  });
};

export const placeTransform = ({ results = [] }) => {
  const mappedResults = results.map((place) => {
    place.photos = [mockImages[Math.floor(Math.random() * mockImages.length)]];
    return {
      ...place,
      isClosedTemporarely: place.business_status === "CLOSED_TEMPORARILY",
      isOpenNow: place.opening_hours && place.opening_hours.open_now,
    };
  });

  return camelize(mappedResults);
};
