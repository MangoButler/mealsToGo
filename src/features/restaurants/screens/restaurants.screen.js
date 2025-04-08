import React, { useState, useContext } from "react";
import { FlatList } from "react-native";
import Search from "../components/search.component.js";
import RestaurantInfoCard from "../components/restaurant-info-card.component";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component.js";
import { PlacesContext } from "../../../services/places/places.context.js";
import LoadingSpinner from "../../../components/utility/loading-spinner.component.js";

const RestaurantsList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 0,
  },
})`
  padding-top: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const TextBox = styled.Text`
  padding: ${(props) => props.theme.space[3]};
  color: ${(props) => props.theme.colors.brand.muted};
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const renderRestaurantItem = ({ item }) => {
  return <RestaurantInfoCard restaurant={item} />;
};

export default function RestaurantsScreen() {
  const { places, isLoading, error } = useContext(PlacesContext);

  return (
    <SafeArea>
      <Search />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <TextBox>Not found</TextBox>
      ) : (
        <RestaurantsList
          data={places}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.name}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      )}
    </SafeArea>
  );
}
