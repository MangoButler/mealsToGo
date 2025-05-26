// https://docs.expo.dev/guides/using-eslint/
// module.exports = {
//   extends: "expo",
//   ignorePatterns: ["/dist/*"],
//   env: {
//     browser: true,
//     node: true,
//   },
// };

module.exports = {
  root: true,
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",

    "prettier",
  ],
  plugins: ["react", "react-native", "@typescript-eslint"],

  env: {
    browser: true,
    node: true,
    "react-native/react-native": true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
