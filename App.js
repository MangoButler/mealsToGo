import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import RestaurantsScreen from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider, useTheme } from "styled-components/native";
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

const Tab = createBottomTabNavigator();

function Navigation() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Restaurants") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.ui.primary,
        tabBarInactiveTintColor: theme.colors.ui.disabled,
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
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
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SafeArea>
          <Navigation />
          <ExpoStatusBar style="auto" />
        </SafeArea>
      </ThemeProvider>
    </NavigationContainer>
  );
}
