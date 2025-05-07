import React, { createContext, useEffect, useState } from "react";

import {
  locationRequest,
  locationTransform,
  searchRequest,
} from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("Jakarta");

  const onSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    setIsLoading(true);

    if (!keyword.length) {
      setIsLoading(false);
      return;
    }

    searchRequest(keyword.toLowerCase())
      .then((result) => {
        setLocation(result);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        setIsLoading(false);
        setLocation({ lat: null, lng: null, viewport: null });
      });

    // locationRequest(keyword.toLowerCase())
    //   .then(locationTransform)
    //   .then((result) => {
    //     setLocation(result);
    //     setIsLoading(false);
    //     setError(null);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     setIsLoading(false);
    //     setLocation("");
    //   });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{ location, isLoading, error, search: onSearch, keyword }}
    >
      {children}
    </LocationContext.Provider>
  );
};
