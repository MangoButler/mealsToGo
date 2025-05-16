import React from "react";
import styled, { useTheme } from "styled-components/native";

export const RowView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ xMargin }) => xMargin};
  margin-top: ${({ topMargin }) => topMargin};
  margin-bottom: ${({ bottomMargin }) => bottomMargin};
`;

const sizes = {
  none: 0,
  small: 1,
  medium: 2,
  large: 3,
};
const getMargin = (margin, theme) => {
  return theme.space[sizes[margin]];
};

const Row = ({
  topMargin = "none",
  bottomMargin = "none",
  xMargin = "none",
  justifyContent = "space-between",
  children,
}) => {
  const theme = useTheme();
  const top = getMargin(topMargin, theme);
  const bottom = getMargin(bottomMargin, theme);
  const horizontal = getMargin(xMargin, theme);
  return (
    <RowView
      topMargin={top}
      bottomMargin={bottom}
      xMargin={horizontal}
      justifyContent={justifyContent}
    >
      {children}
    </RowView>
  );
};

export default Row;
