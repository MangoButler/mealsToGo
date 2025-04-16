import * as React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Spinner = styled(ActivityIndicator)`
  margin: -25px;
`;

const LoadingSpinner = ({ size = 50 }) => {
  const theme = useTheme();
  return (
    <LoadingContainer>
      <Spinner animating={true} color={theme.colors.ui.primary} size={size} />
    </LoadingContainer>
  );
};

export default LoadingSpinner;
