import React, { useCallback, useContext, useMemo, useState } from "react";
import { FlatList } from "react-native";
import Search from "../../components/search.component.js";
import PlaceInfoCard from "../../components/places-info-card.component.js";
import styled from "styled-components/native";
import { PlacesContext } from "../../../../services/places/places.context.js";
import LoadingSpinner from "../../../../components/utility/loading-spinner.component.js";
import { FavoritesContext } from "../../../../services/favorites/favorites.context.js";
import NotFound from "../../../../components/utility/not-found.component.js";
import ActionButton from "../../../../components/utility/action-button.component.js";
import ErrorScreen from "../../../../components/utility/error-screen.component.js";

import MenuButton from "../../../../components/utility/menu-button.component.js";
import Row from "../../../../components/spacer/row.component.js";
import HighlightBar from "../../../../components/favorites/highlight-places-bar.component.js";

const PlacesCardContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
`;

const PlacesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 0,
  },
})`
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const MenuToggleButton = styled(MenuButton)`
  flex: 0.3;
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
  const { favorites } = useContext(FavoritesContext);
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };

  const filters = [];
  const trending = [];
  const highlightedItems =
    activePanel === "favorites"
      ? favorites
      : activePanel === "filters"
        ? filters
        : activePanel === "trending"
          ? trending
          : [];

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
    <PlacesCardContainer>
      <ActionButton
        icon={"map-marker-plus-outline"}
        onPress={onFloatingButtonClick}
      />
      <Search />
      <Row xMargin="large">
        <MenuToggleButton
          icon={activePanel === "favorites" ? "chevron-up" : "heart-outline"}
          onPress={() => togglePanel("favorites")}
        >
          Favorites
        </MenuToggleButton>
        <MenuToggleButton
          icon={activePanel === "trending" ? "chevron-up" : "trending-up"}
          onPress={() => togglePanel("trending")}
        >
          Trending
        </MenuToggleButton>
        <MenuToggleButton
          icon={activePanel === "filters" ? "chevron-up" : "filter-variant"}
          onPress={() => togglePanel("filters")}
        >
          Filters
        </MenuToggleButton>
      </Row>

      <HighlightBar
        visible={activePanel !== null}
        panelType={activePanel}
        items={highlightedItems}
        navigation={navigation}
      />

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
    </PlacesCardContainer>
  );
}
