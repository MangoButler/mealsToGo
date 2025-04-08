import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import { LocationContext } from "../location/location.context";

import { placeRequest, placeTransform } from "./places.service";

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveplaces = (loc) => {
    setIsLoading(true);
    setPlaces([]);
    setTimeout(() => {
      placeRequest(loc)
        .then(placeTransform)
        .then((results) => {
          setPlaces(results);
          setIsLoading(false);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    const locationString = location ? `${location.lat},${location.lng}` : "";
    retrieveplaces(locationString);
  }, [location]);

  return (
    <PlacesContext.Provider value={{ places, isLoading, error }}>
      {children}
    </PlacesContext.Provider>
  );
};
