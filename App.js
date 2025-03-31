import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import RestaurantsScreen from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Rubik_400Regular } from "@expo-google-fonts/rubik";
import { Inconsolata_400Regular } from "@expo-google-fonts/inconsolata";

export default function App() {
  const [poppinsLoaded] = useFonts({
    Poppins_400Regular,
  });
  const [rubikLoaded] = useFonts({
    Rubik_400Regular,
  });
  const [inconsolataLoaded] = useFonts({
    Inconsolata_400Regular,
  });

  if (!inconsolataLoaded || !rubikLoaded || !poppinsLoaded)
    return <AppLoading />;
  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsScreen />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
