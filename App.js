import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts,
  Poppins_300Light_Italic,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { Inconsolata_400Regular } from "@expo-google-fonts/inconsolata";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { PlacesContextProvider } from "./src/services/places/places.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { FavoritesContextProvider } from "./src/services/favorites/favorites.context";
import { AuthenticationContextProvider } from "./src/services/auth/auth.context";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

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

  const onLayoutRootView = useCallback(async () => {
    if (poppinsLoaded && rubikLoaded && inconsolataLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [poppinsLoaded, rubikLoaded, inconsolataLoaded]);

  if (!poppinsLoaded || !rubikLoaded || !inconsolataLoaded) {
    return null; // show splash until fonts are loaded
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
        <LocationContextProvider>
          <PlacesContextProvider>
            <FavoritesContextProvider>
              <SafeArea onLayout={onLayoutRootView}>
                <PaperProvider>
                  <Navigation />
                  <ExpoStatusBar style="auto" />
                </PaperProvider>
              </SafeArea>
            </FavoritesContextProvider>
          </PlacesContextProvider>
        </LocationContextProvider>
      </AuthenticationContextProvider>
    </ThemeProvider>
  );
}
