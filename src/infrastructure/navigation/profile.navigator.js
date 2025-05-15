import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../features/profile/screens/profile.screen";
import UpdateProfileScreen from "../../features/profile/screens/update-profile.screen";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
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
      <Stack.Screen name="Main" component={ProfileScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
