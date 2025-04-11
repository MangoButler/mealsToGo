import React from "react";
import PlaceDetailCard from "../../components/place-detail-card.component";

const PlacesDetailScreen = ({ route }) => {
  const { item } = route.params;
  return <PlaceDetailCard place={item} />;
};

export default PlacesDetailScreen;
