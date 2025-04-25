import React, { useCallback, useContext, useMemo } from "react";
import { FlatList } from "react-native";
import Search from "../../components/search.component.js";
import PlaceInfoCard from "../../components/places-info-card.component.js";
import styled from "styled-components/native";
import { PlacesContext } from "../../../../services/places/places.context.js";
import LoadingSpinner from "../../../../components/utility/loading-spinner.component.js";

import NotFound from "../../../../components/utility/not-found.component.js";
import ActionButton from "../../../../components/utility/action-button.component.js";
import ErrorScreen from "../../../../components/utility/error-screen.component.js";

const PlacesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 0,
  },
})`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

// const TextBox = styled.Text`
//   padding: ${(props) => props.theme.space[3]};
//   color: ${(props) => props.theme.colors.brand.muted};
//   font-size: ${(props) => props.theme.fontSizes.title};
// `;

const createRenderPlaceItem = ({ onDetailClick }) => {
  const RenderItem = ({ item }) => (
    <PlaceInfoCard place={item} onDetailClick={() => onDetailClick(item)} />
  );

  RenderItem.displayName = "RenderPlaceItem";
  return RenderItem;
};

export default function PlacesScreen({ navigation }) {
  const { places, isLoading, error } = useContext(PlacesContext);

  const onDetailClick = useCallback(
    (item) => {
      navigation.navigate("PlaceDetail", { item });
    },
    [navigation]
  );

  const onFloatingButtonClick = () => {
    navigation.navigate("NewPlace");
  };

  const renderItem = useMemo(
    () => createRenderPlaceItem({ onDetailClick }),
    [onDetailClick]
  );

  return (
    <>
      <ActionButton
        icon={"map-marker-plus-outline"}
        onPress={onFloatingButtonClick}
      />
      <Search />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : places.length ? (
        <PlacesList
          data={places}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      ) : (
        <NotFound />
      )}
    </>
  );
}
