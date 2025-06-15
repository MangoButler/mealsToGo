import { View, Text } from "react-native";
import React from "react";
import ActiveHangoutPlaceCard from "../../components/active-hangout-place-card.component";

const ActiveHangoutPlaceScreen = ({ navigation, route }) => {
  const { item } = route.params;
  return <ActiveHangoutPlaceCard place={item} navigation={navigation} />;
};

export default ActiveHangoutPlaceScreen;
