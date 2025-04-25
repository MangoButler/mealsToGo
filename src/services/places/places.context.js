import React, { useState, useEffect, createContext, useContext } from "react";
import { LocationContext } from "../location/location.context";

import { fetchPlaces } from "./places.service";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { keyword } = useContext(LocationContext);
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

  // const retrievePlaces = async () => {
  //   setIsLoading(true);
  //   setPlaces([]);
  //   try {
  //     const places = await fetchPlaces(keyword);
  //     setPlaces(places);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error);
  //     setIsLoading(false);
  //   }
  // };

  const triggerPlacesRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const retrievePlaces = async (query) => {
      setIsLoading(true);
      setPlaces([]);
      setError(null);
      try {
        const places = await fetchPlaces(query);
        setPlaces(places);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    // const locationString = location ? `${location.lat},${location.lng}` : "";
    // retrievePlaces(locationString);
    retrievePlaces(keyword.toLowerCase());
  }, [refresh, keyword]);

  return (
    <PlacesContext.Provider
      value={{ places, isLoading, error, triggerPlacesRefresh }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
