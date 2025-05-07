import React from "react";
import styled, { useTheme } from "styled-components/native";

export const RowView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  children,
}) => {
  const theme = useTheme();
  const top = getMargin(topMargin, theme);
  const bottom = getMargin(bottomMargin, theme);
  const horizontal = getMargin(xMargin, theme);
  return (
    <RowView topMargin={top} bottomMargin={bottom} xMargin={horizontal}>
      {children}
    </RowView>
  );
};

export default Row;
