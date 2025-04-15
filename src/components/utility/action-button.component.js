import * as React from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "styled-components/native";

const { height, width } = Dimensions.get("window");

const ActionButton = ({ icon = "plus", onPress = () => {} }) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <TouchableRipple
        onPress={onPress}
        borderless={true}
        rippleColor={theme.colors.ui.disabled + "33"}
        style={[
          styles.rippleButton,
          { backgroundColor: theme.colors.ui.secondary },
        ]}
      >
        <View style={styles.iconContainer}>
          <Icon name={icon} size={32} color={theme.colors.text.inverse} />
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: height * 0.03,
    right: width * 0.02,
    zIndex: 100,
  },
  rippleButton: {
    borderRadius: 35,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActionButton;
