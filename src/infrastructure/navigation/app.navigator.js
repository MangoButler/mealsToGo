import HomeScreen from "../../features/places/screens/home.screen";
import SettingsScreen from "../../features/places/screens/settings.screen";
import ProfileScreen from "../../features/places/screens/profile.screen";
import MapScreen from "../../features/map/screens/map.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";
import PlacesNavigator from "./places.navigation";
import styled from "styled-components/native";

const Tab = createBottomTabNavigator();

const NavContainer = styled(NavigationContainer)`
  margin-top: ${(props) => props.theme.space[4]};
`;

const TAB_ICON = {
  // Restaurants: "restaurant",
  Home: "home",
  Map: "map",
  Settings: "settings-sharp",
  Profile: "person",
  Places: "location-sharp",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ focused, size, color }) => (
      <Ionicons
        name={focused ? iconName : `${iconName.split("-")[0]}-outline`}
        size={size}
        color={color}
      />
    ),
    tabBarActiveTintColor: theme.colors.ui.primary,
    tabBarInactiveTintColor: theme.colors.ui.disabled,
  };
};

export default function AppNavigator() {
  return (
    <NavContainer>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Places"
          component={PlacesNavigator}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Map"
          component={MapScreen}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavContainer>
  );
}
