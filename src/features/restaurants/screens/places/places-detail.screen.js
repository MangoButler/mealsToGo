import React from "react";
import PlaceDetailCard from "../../components/place-detail-card.component";

const PlacesDetailScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return <PlaceDetailCard place={item} navigation={navigation} />;
};

export default PlacesDetailScreen;
