import { styled, useTheme } from "styled-components/native";

import React from "react";

const sizes = {
  small: 1,
  medium: 2,
  large: 3,
};

const positions = {
  top: "margin-top",
  left: "margin-left",
  bottom: "margin-bottom",
  right: "margin-right",
};

const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

const getVariant = (position, size, theme) => {
  return `${positions[position]}: ${theme.space[sizes[size]]}`;
};

export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};
