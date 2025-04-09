import { StatusBar as ExpoStatusBar } from "expo-status-bar";
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

import { SafeArea } from "./src/components/utility/safe-area.component";
import { PlacesContextProvider } from "./src/services/places/places.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";

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
          <SafeArea>
            <Navigation />
            <ExpoStatusBar style="auto" />
          </SafeArea>
        </PlacesContextProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}
