import styled, { useTheme } from "styled-components";
import { Button } from "react-native-paper";
import React from "react";
import { theme } from "../../infrastructure/theme";

export const MenuActionButton = styled(Button)`
  border-radius: ${(props) => props.theme.space[5]};
  /* margin: 0 ${(props) => props.theme.space[3]}; */
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const MenuButton = ({
  icon = null,
  children,
  onPress = () => {},
  disabled = false,

  buttonColor = theme.colors.bg.secondary,
  textColor = theme.colors.text.secondary,
  ...props
}) => {
  const theme = useTheme();
  const bgColor = !disabled
    ? buttonColor || theme.colors.ui.primary
    : theme.colors.ui.disabled;

  return (
    <MenuActionButton
      icon={icon}
      onPress={onPress}
      mode="contained-tonal"
      disabled={disabled}
      buttonColor={bgColor}
      textColor={textColor || theme.colors.text.inverse}
      {...props}
    >
      {children}
    </MenuActionButton>
  );
};

export default MenuButton;
