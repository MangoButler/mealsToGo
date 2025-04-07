import React, { useState, useEffect, createContext, useMemo } from "react";

import { placeRequest, placeTransform } from "./places.service";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveplaces = () => {
    setIsLoading(true);
    setTimeout(() => {
      placeRequest()
        .then(placeTransform)
        .then((results) => {
          setPlaces(results);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    retrieveplaces();
  }, []);

  return (
    <PlacesContext.Provider value={{ places, isLoading, error }}>
      {children}
    </PlacesContext.Provider>
  );
};
