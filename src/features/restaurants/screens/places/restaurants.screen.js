import React, { useCallback, useContext, useMemo } from "react";
import { FlatList } from "react-native";
import Search from "../../components/search.component.js";
import RestaurantInfoCard from "../../components/restaurant-info-card.component.js";
import styled from "styled-components/native";
import { SafeArea } from "../../../../components/utility/safe-area.component.js";
import { PlacesContext } from "../../../../services/places/places.context.js";
import LoadingSpinner from "../../../../components/utility/loading-spinner.component.js";
import { View } from "react-native-web";
import NotFound from "../../../../components/utility/not-found.component.js";

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

const createRenderRestaurantItem = ({ onDetailClick }) => {
  const RenderItem = ({ item }) => (
    <RestaurantInfoCard
      restaurant={item}
      onDetailClick={() => onDetailClick(item)}
    />
  );

  RenderItem.displayName = "RenderRestaurantItem";
  return RenderItem;
};

export default function RestaurantsScreen({ navigation }) {
  const { places, isLoading, error } = useContext(PlacesContext);

  const onDetailClick = useCallback(
    (item) => {
      navigation.navigate("PlaceDetail", { item });
    },
    [navigation]
  );

  const renderItem = useMemo(
    () => createRenderRestaurantItem({ onDetailClick }),
    [onDetailClick]
  );

  return (
    <>
      <Search />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <NotFound />
      ) : (
        <RestaurantsList
          data={places}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      )}
    </>
  );
}
