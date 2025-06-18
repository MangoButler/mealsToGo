import { styled, useTheme } from "styled-components/native";
import React from "react";

const sizes = {
  small: 1,
  medium: 2,
  large: 3,
  xlarge: 4,
};

const positions = {
  top: "margin-top",
  left: "margin-left",
  bottom: "margin-bottom",
  right: "margin-right",
  horizontal: ["margin-left", "margin-right"],
  vertical: ["margin-top", "margin-bottom"],
};

const Line = styled.View`
  background-color: ${({ color, theme }) =>
    color || theme.colors.text.secondary};
  height: 1px;
  width: 100%;
`;

// const Line = styled.View`
//   ${({ color, theme }) => `
//     background-color: ${color || theme.colors.text.secondary};
//   `}
//   height: 1px;
//   width: 100%;

//   ${({ position }) =>
//     position === "left" || position === "right"
//       ? "width: 1px; height: 100%;"
//       : "height: 1px; width: 100%;"}
// `;

const SpacerView = styled.View`
  ${({ variant }) => variant};
  flex-shrink: 0;
`;

const getVariant = (position, size, theme) => {
  const value = theme.space[sizes[size]];
  const pos = positions[position];

  if (Array.isArray(pos)) {
    return pos.map((p) => `${p}: ${value};`).join(" ");
  }

  return `${pos}: ${value};`;
};

export const Spacer = ({
  position = "top",
  size = "small",
  children,
  showLine = false,
  lineColor,
}) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  const color = lineColor ? lineColor : theme.colors.ui.secondary;
  if (children) {
    return <SpacerView variant={variant}>{children}</SpacerView>;
  }
  return (
    <SpacerView variant={variant}>
      {showLine && <Line theme={theme} position={position} color={color} />}
    </SpacerView>
  );
};
