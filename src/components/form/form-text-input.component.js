import { TextInput } from "react-native-paper";
import React from "react";
import styled, { useTheme } from "styled-components";
import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";

const StyledTextInput = styled(TextInput)`
  border-radius: ${(props) => props.theme.space[2]};
`;

const TextInputContainer = styled.View`
  /* margin: ${(props) => props.theme.space[2]} 0; */
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const FormTextInput = ({
  value,
  label,
  onChangeText,
  error = null,
  multiline = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TextInputContainer>
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
        {...props}
      />
      {error && (
        <Spacer size={"small"} position={"top"}>
          <Text variant={"error"} theme={theme}>
            {error instanceof Error ? error.message : error}
          </Text>
        </Spacer>
      )}
    </TextInputContainer>
  );
};

export default FormTextInput;
