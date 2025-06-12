import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
// import { theme as customTheme } from "./path-to-your-theme";
import { theme as customTheme } from "./index";

export const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: customTheme.colors.brand.primary,
    accent: customTheme.colors.brand.secondary,
    background: customTheme.colors.bg.primary,
    surface: customTheme.colors.bg.secondary,
    text: customTheme.colors.text.primary,
    error: customTheme.colors.text.error,
    disabled: customTheme.colors.ui.disabled,
    placeholder: customTheme.colors.text.secondary,
    notification: customTheme.colors.brand.quaternary,
  },
};
