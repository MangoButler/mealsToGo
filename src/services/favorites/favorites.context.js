import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPlaces } from "../places/places.service";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (place) => {
    setFavorites((prev) => [...prev, place]);
  };

  const removeFromFavorites = (place) => {
    const newFavorites = favorites.filter((item) => item.id !== place.id);
    setFavorites(newFavorites);
  };

  const saveFavorites = async (value) => {
    if (!Array.isArray(value)) {
      console.warn("🚨 Tried to save non-array to favorites:", value);
      return;
    }

    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      console.log("❌ Error saving favorites:", e);
    }
  };

  //   ✅ Load favorites

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@favorites");
        const parsed = jsonValue ? JSON.parse(jsonValue) : [];

        if (!Array.isArray(parsed)) {
          console.warn("Parsed favorites was not an array");
          setFavorites([]);
          return;
        }

        // Fetch the full place list from your backend (used to verify favorites)
        const allPlaces = await fetchPlaces("");

        const validFavorites = allPlaces.filter((place) =>
          parsed.some((fav) => fav.id === place.id)
        );

        setFavorites(validFavorites);
        await saveFavorites(validFavorites); // Clean up invalid ones from storage
      } catch (e) {
        console.log("❌ Error loading favorites:", e);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, []);

  // ✅ Save favorites
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
