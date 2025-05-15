import styled, { useTheme } from "styled-components";
import { Button } from "react-native-paper";
import React from "react";

export const FormActionButton = styled(Button)`
  border-radius: ${(props) => props.theme.space[2]};
  /* margin: ${(props) => props.theme.space[2]} 0; */
  /* margin-bottom: ${(props) => props.theme.space[2]}; */
`;

const FormButton = ({
  icon = null,
  children,
  onPress = () => {},
  disabled = false,
  buttonColor = null,
  ...props
}) => {
  const theme = useTheme();
  const bgColor =
    buttonColor ||
    (!disabled ? theme.colors.ui.primary : theme.colors.ui.disabled);

  return (
    <FormActionButton
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      buttonColor={bgColor}
      textColor={theme.colors.text.inverse}
      {...props}
    >
      {children}
    </FormActionButton>
  );
};

export default FormButton;
