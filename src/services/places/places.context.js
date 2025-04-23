import React, { useState, useEffect, createContext, useContext } from "react";
import { LocationContext } from "../location/location.context";

import { fetchAllPlaces, placeRequest, placeTransform } from "./places.service";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);
  const [refresh, setRefresh] = useState(false);

  // const retrievePlaces = (loc) => {
  //   setIsLoading(true);
  //   setPlaces([]);
  //   setTimeout(() => {
  //     placeRequest(loc)
  //       .then(placeTransform)
  //       .then((results) => {
  //         setPlaces(results);
  //         setIsLoading(false);
  //         setError(null);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //         setIsLoading(false);
  //       });
  //   }, 2000);
  // };

  const retrievePlaces = async (loc) => {
    setIsLoading(true);
    setPlaces([]);
    try {
      const places = await fetchAllPlaces();
      setPlaces(places);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const triggerPlacesRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const locationString = location ? `${location.lat},${location.lng}` : "";
    retrievePlaces(locationString);
  }, [location, refresh]);

  return (
    <PlacesContext.Provider
      value={{ places, isLoading, error, triggerPlacesRefresh }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
