import { TextInput } from "react-native-paper";
import React from "react";
import styled, { useTheme } from "styled-components";

const StyledTextInput = styled(TextInput)`
  border-radius: ${(props) => props.theme.space[2]};
  /* margin: ${(props) => props.theme.space[2]} 0; */
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const FormTextInput = ({
  value,
  label,
  onChangeText,
  error = null,
  multiline = false,
}) => {
  const theme = useTheme();
  return (
    <StyledTextInput
      label={label}
      value={value}
      mode="outlined"
      onChangeText={onChangeText}
      outlineColor={theme.colors.ui.primary}
      textColor={theme.colors.text.primary}
      error={error}
      activeOutlineColor={theme.colors.ui.primary}
      dense
      multiline={multiline}
    />
  );
};

export default FormTextInput;
