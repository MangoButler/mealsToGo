import { View, Text } from "react-native";
import React from "react";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import RestaurantInfoCard from "../../components/restaurant-info-card.component";
import PlaceDetailCard from "../../components/place-detail-card.component";

const PlacesDetailScreen = ({ route }) => {
  const { item } = route.params;
  const { name, address } = item;
  return <PlaceDetailCard place={item} />;
};

export default PlacesDetailScreen;
