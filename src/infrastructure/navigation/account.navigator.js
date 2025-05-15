import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../features/account/screens/account.screen";
import LoginScreen from "../../features/account/screens/login.screen";
import RegisterScreen from "../../features/account/screens/register.screen";
import CreateProfileScreen from "../../features/account/screens/create-profile.screen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "vertical",
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.height, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <Stack.Screen
        name="Main"
        component={AccountScreen}
        // options={{
        //   presentation: "modal", // Enables the modal style on iOS
        //   gestureDirection: "vertical",
        //   cardStyleInterpolator: ({ current, layouts }) => {
        //     return {
        //       cardStyle: {
        //         transform: [
        //           {
        //             translateY: current.progress.interpolate({
        //               inputRange: [0, 1],
        //               outputRange: [layouts.screen.height, 0],
        //             }),
        //           },
        //         ],
        //       },
        //     };
        //   },
        // }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // options={{
        //   presentation: "modal", // Enables the modal style on iOS
        //   gestureDirection: "vertical",
        //   cardStyleInterpolator: ({ current, layouts }) => {
        //     return {
        //       cardStyle: {
        //         transform: [
        //           {
        //             translateY: current.progress.interpolate({
        //               inputRange: [0, 1],
        //               outputRange: [layouts.screen.height, 0],
        //             }),
        //           },
        //         ],
        //       },
        //     };
        //   },
        // }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        // options={{
        //   presentation: "modal", // Enables the modal style on iOS
        //   gestureDirection: "vertical",
        //   cardStyleInterpolator: ({ current, layouts }) => {
        //     return {
        //       cardStyle: {
        //         transform: [
        //           {
        //             translateY: current.progress.interpolate({
        //               inputRange: [0, 1],
        //               outputRange: [layouts.screen.height, 0],
        //             }),
        //           },
        //         ],
        //       },
        //     };
        //   },
        // }}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        // options={{
        //   presentation: "modal", // Enables the modal style on iOS
        //   gestureDirection: "vertical",
        //   cardStyleInterpolator: ({ current, layouts }) => {
        //     return {
        //       cardStyle: {
        //         transform: [
        //           {
        //             translateY: current.progress.interpolate({
        //               inputRange: [0, 1],
        //               outputRange: [layouts.screen.height, 0],
        //             }),
        //           },
        //         ],
        //       },
        //     };
        //   },
        // }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
