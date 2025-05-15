// import React from "react";
// import { SafeAreaView, StatusBar, Platform } from "react-native";
// import styled from "styled-components/native";

// const StyledSafeArea = styled(SafeAreaView)`
//   flex: 1;
//   background-color: ${(props) => props.theme.colors.bg.primary};
//   padding-top: ${(props) =>
//     Platform.OS === "android" ? `${StatusBar.currentHeight}px` : "0px"};
// `;

// export const SafeArea = ({ children }) => {
//   return <StyledSafeArea>{children}</StyledSafeArea>;
// };

import React from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import styled from "styled-components/native";

const StyledSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding-top: ${(props) =>
    Platform.OS === "android" ? `${StatusBar.currentHeight}px` : "0px"};
`;

export const SafeArea = ({ children, onLayout }) => {
  return <StyledSafeArea onLayout={onLayout}>{children}</StyledSafeArea>;
};
