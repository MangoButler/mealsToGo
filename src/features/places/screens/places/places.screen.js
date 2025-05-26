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
import { AuthenticationContext } from "../../../../services/auth/auth.context.js";
import ListSelector from "../../../../components/utility/list-selector.component.js";
import { getCityFromUserLocation } from "../../../../utils/location.functions.js";
import { TOKYO_WARD_NAMES } from "../../../../utils/tokyo-wards.js";
import { JAKARTA_WARD_NAMES } from "../../../../utils/jkt-wards.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "../../../../services/places/places-api-url.js";
import CheckboxSelector from "../../../../components/utility/checkbox-selector.component.js";
import { FEATURES } from "../../../../utils/features-list.js";
import {
  getFilteredPlaces,
  sortOptions,
} from "../../../../utils/sorting-and-filtering-options.js";
import { useEffect } from "react";

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
const FilterToggleButton = styled(MenuButton).attrs((props) => ({
  mode: "outlined",
  textColor: !props.active
    ? props.theme.colors.text.primary
    : props.theme.colors.text.inverse,
}))`
  flex: 0.25;
  margin-right: ${(props) => props.theme.space[1]};
  background-color: ${(props) =>
    props.active ? props.theme.colors.ui.primary : "transparent"};
  border-color: ${(props) =>
    props.active
      ? props.theme.colors.ui.primary
      : props.theme.colors.ui.tertiary};
  color: ${(props) =>
    props.active
      ? props.theme.colors.text.primary
      : props.theme.colors.text.inverse};
  border-width: 1px;
  border-radius: 20px;
  padding: ${(props) => props.theme.space[0]} ${(props) => props.theme.space[1]};
`;

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
  const { user, setUser } = useContext(AuthenticationContext);
  const togglePanel = (panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };
  const [filters, setFilters] = useState({
    area: null, // e.g., "Shibuya"
    features: [], // e.g., ["table", "raincover"]
    sort: null, // e.g., "popular" — optional for now
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const trending = [];
  const highlightedItems =
    activePanel === "favorites"
      ? favorites
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

  const onFavoriteCardPress = (item) => {
    navigation.navigate("PlaceDetail", { item });
  };

  const setAreaFilter = (area) => {
    setFilters((prev) => ({
      ...prev,
      area: prev.area === area ? null : area,
    }));
  };
  const setSortFilter = (sort) => {
    setFilters((prev) => ({
      ...prev,
      sort: prev.sort === sort ? null : sort,
    }));
  };

  const toggleFeature = (feature) => {
    setFilters((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  // const filteredPlaces = useMemo(async () => {
  //   return await getFilteredPlaces(places, filters);
  // }, [places, filters]);

  const [filteredPlaces, setFilteredPlaces] = useState(places);

  useEffect(() => {
    const fetchFilteredPlaces = async () => {
      const result = await getFilteredPlaces(places, filters);
      setFilteredPlaces(result);
    };

    fetchFilteredPlaces();
  }, [places, filters]);

  const handleAreaFilterOpen = async () => {
    if (user && (!user.city || user.city === "Unknown")) {
      const currentCity = await getCityFromUserLocation();
      setUser((user) => {
        return { ...user, city: currentCity };
      });

      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify({ ...user, city: currentCity })
      );
    }
    setFilterModalVisible("area");
  };

  const activeWards =
    user.city === "Tokyo"
      ? TOKYO_WARD_NAMES
      : user.city === "Jakarta"
        ? JAKARTA_WARD_NAMES
        : [];

  return (
    <PlacesCardContainer>
      {user && user.places?.length < 3 && (
        <ActionButton
          icon={"map-marker-plus-outline"}
          onPress={onFloatingButtonClick}
        />
      )}
      <Search />
      <Row xMargin="large" bottomMargin="medium">
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
        visible={activePanel !== null && activePanel !== "filters"}
        panelType={activePanel}
        items={highlightedItems}
        onCardPress={onFavoriteCardPress}
      />

      {activePanel === "filters" && (
        <>
          <Row xMargin="large" bottomMargin="medium" topMargin="medium">
            <FilterToggleButton
              icon="map"
              onPress={async () => await handleAreaFilterOpen()}
              active={filters.area}
            >
              District
            </FilterToggleButton>
            <FilterToggleButton
              icon="table"
              active={filters.features.length}
              onPress={() => setFilterModalVisible("features")}
            >
              Features
            </FilterToggleButton>
            <FilterToggleButton
              icon="sort"
              active={filters.sort}
              onPress={() => setFilterModalVisible("sort")}
            >
              Sort
            </FilterToggleButton>
          </Row>

          <ListSelector
            visible={filterModalVisible === "area"}
            onDismiss={() => setFilterModalVisible(false)}
            selectedItem={filters.area}
            onSelect={setAreaFilter}
            availableItems={activeWards}
          />

          <CheckboxSelector
            visible={filterModalVisible === "features"}
            onDismiss={() => setFilterModalVisible(false)}
            selectedItems={filters.features}
            onToggleItem={toggleFeature}
            availableItems={FEATURES}
            onReset={() => setFilters({ ...filters, features: [] })}
          />

          <ListSelector
            visible={filterModalVisible === "sort"}
            onDismiss={() => setFilterModalVisible(false)}
            selectedItem={filters.sort}
            onSelect={setSortFilter}
            availableItems={sortOptions}
          />
        </>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : filteredPlaces.length ? (
        <PlacesList
          data={filteredPlaces}
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
