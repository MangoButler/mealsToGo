import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import FormTextInput from "../../../components/form/form-text-input.component";

const PasswordInput = ({ label, value, onChangeText, ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <FormTextInput
      secureTextEntry={!passwordVisible}
      mode="outlined"
      value={value}
      label={label}
      onChangeText={onChangeText}
      right={
        <TextInput.Icon
          icon={passwordVisible ? "eye" : "eye-off"}
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      }
      {...props}
    />
  );
};

export default PasswordInput;
