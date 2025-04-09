import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import RestaurantsScreen from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_300Light_Italic,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { Inconsolata_400Regular } from "@expo-google-fonts/inconsolata";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/features/restaurants/screens/home.screen";
import SettingsScreen from "./src/features/restaurants/screens/settings.screen";
import MapScreen from "./src/features/restaurants/screens/map.screen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./src/features/restaurants/screens/profile.screen";
import { PlacesContextProvider } from "./src/services/places/places.context";
import { LocationContextProvider } from "./src/services/location/location.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  // Restaurants: "restaurant",
  Home: "home",
  Map: "map",
  Settings: "settings-sharp",
  Profile: "person",
  Locations: "location-sharp",
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

function Navigation() {
  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Locations"
        component={RestaurantsScreen}
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
  );
}

export default function App() {
  const [poppinsLoaded] = useFonts({
    Poppins_300Light_Italic,
    Poppins_700Bold,
  });
  const [rubikLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });
  const [inconsolataLoaded] = useFonts({
    Inconsolata_400Regular,
  });

  if (!inconsolataLoaded || !rubikLoaded || !poppinsLoaded)
    return <AppLoading />;
  return (
    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <PlacesContextProvider>
          <NavigationContainer>
            <SafeArea>
              <Navigation />
              <ExpoStatusBar style="auto" />
            </SafeArea>
          </NavigationContainer>
        </PlacesContextProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}
