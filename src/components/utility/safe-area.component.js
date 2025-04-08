import React from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

const StyledSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-top: ${(props) =>
    Platform.OS === "android" ? `${StatusBar.currentHeight / 2}px` : "0px"};
`;

export const SafeArea = ({ children }) => {
  return <StyledSafeArea>{children}</StyledSafeArea>;
};
