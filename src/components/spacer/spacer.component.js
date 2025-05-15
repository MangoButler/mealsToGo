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
  horizontal: ["margin-left", "margin-right"],
  vertical: ["margin-top", "margin-bottom"],
};

const SpacerView = styled.View`
  ${({ variant }) => variant}
`;

const getVariant = (position, size, theme) => {
  const value = theme.space[sizes[size]];
  const pos = positions[position];

  if (Array.isArray(pos)) {
    return pos.map((p) => `${p}: ${value};`).join(" ");
  }

  return `${pos}: ${value};`;
};

export const Spacer = ({ position = "top", size = "small", children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);

  return <SpacerView variant={variant}>{children}</SpacerView>;
};
