import React from "react";
import { Text } from "react-native-paper";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import RestaurantsScreen from "../../features/restaurants/screens/restaurants.screen";

const PlacesStack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <PlacesStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <PlacesStack.Screen name="Overview" component={RestaurantsScreen} />
      <PlacesStack.Screen
        name="PlaceDetail"
        component={() => <Text>Place details</Text>}
      />
    </PlacesStack.Navigator>
  );
};

export default PlacesNavigator;
