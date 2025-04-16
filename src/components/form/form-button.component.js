import styled, { useTheme } from "styled-components";
import { Button } from "react-native-paper";
import React from "react";

export const FormActionButton = styled(Button)`
  border-radius: ${(props) => props.theme.space[2]};
  /* margin: ${(props) => props.theme.space[2]} 0; */
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const FormButton = ({
  icon = null,
  children,
  onPress = () => {},
  disabled = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <FormActionButton
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      buttonColor={
        !disabled ? theme.colors.ui.primary : theme.colors.ui.disabled
      }
      textColor={theme.colors.text.inverse}
      mode="contained"
      {...props}
    >
      {children}
    </FormActionButton>
  );
};

export default FormButton;
