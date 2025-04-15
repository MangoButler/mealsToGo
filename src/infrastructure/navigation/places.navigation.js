import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PlacesScreen from "../../features/places/screens/places/places.screen";
import PlacesDetailScreen from "../../features/places/screens/places/places-detail.screen";
import NewPlaceScreen from "../../features/places/screens/places/new-place.screen";

const PlacesStack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <PlacesStack.Screen name="Overview" component={PlacesScreen} />
      <PlacesStack.Screen name="PlaceDetail" component={PlacesDetailScreen} />
      <PlacesStack.Screen name="NewPlace" component={NewPlaceScreen} />
    </PlacesStack.Navigator>
  );
};

export default PlacesNavigator;
