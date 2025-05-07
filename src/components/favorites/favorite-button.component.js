import { View, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { FavoritesContext } from "../../services/favorites/favorites.context";
import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const FavoriteIcon = styled(TouchableOpacity)`
  /* border-color: ${(props) => props.theme.colors.ui.primary}; */
  position: absolute;
  top: 25px;
  right: 25px;

  z-index: 10;
`;

const FavoriteButton = ({ place }) => {
  const { addToFavorites, removeFromFavorites, favorites } =
    useContext(FavoritesContext);

  const isInFavorites = favorites.find((item) => item.id === place.id);
  const handleFavorites = () => {
    return isInFavorites ? removeFromFavorites(place) : addToFavorites(place);
  };

  return (
    <FavoriteIcon onPress={handleFavorites}>
      <AntDesign
        name={isInFavorites ? "heart" : "hearto"}
        size={24}
        color={isInFavorites ? "red" : "white"}
      />
    </FavoriteIcon>
  );
};

export default FavoriteButton;
