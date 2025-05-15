import React, { useContext, useState, useEffect } from "react";
import {
  AccountBackground,
  AccountContainer,
} from "../components/account.styles";
import FormTextInput from "../../../components/form/form-text-input.component";
import { useTheme } from "styled-components";
import { FormActionButton } from "../../../components/form/form-button.component";
// import { ButtonRow } from "../../../components/utility/utility.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { InputWrapper } from "../../../components/utility/utility.styles";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import PasswordInput from "../components/password-input.component";
import {
  isStrongPassword,
  isValidEmail,
  renderError,
} from "../../../utils/validation";

const RegisterScreen = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    onSignUp,
    error: signUpError,
    isLoading,
    user,
  } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user && !signUpError) {
      navigation.navigate("CreateProfile");
    }
  }, [user, signUpError, navigation]);

  const handleSignUp = async (email, password) => {
    if (!email || !isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!password || !isStrongPassword(password)) {
      setPasswordError(
        "Password needs to be at least 8 characters long & include: 1 upper case letter, 1 lower case letter, 1 digit & 1 special character"
      );

      return;
    }
    await onSignUp(email, password);
  };

  return (
    <AccountBackground>
      <AccountContainer>
        <Text variant="heading" theme={theme}>
          Join us!
        </Text>
        <InputWrapper>
          <Text variant="hint" theme={theme}>
            Enter your email address:
          </Text>
          <FormTextInput
            value={email}
            label="Email"
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError(null);
            }}
            error={emailError}
          />

          <Text variant="hint" theme={theme}>
            Set your password:
          </Text>
          <PasswordInput
            value={password}
            label="Password"
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError(null);
            }}
            error={passwordError}
          />
        </InputWrapper>
        {signUpError && (
          <Text variant="error" theme={theme}>
            {renderError(signUpError)}
          </Text>
        )}
        <Spacer size="large" position="top">
          <FormActionButton
            mode="contained"
            onPress={() => {
              handleSignUp(email, password);
            }}
            buttonColor={theme.colors.ui.primary}
            textColor={theme.colors.text.inverse}
            loading={isLoading}
          >
            Sign Up
          </FormActionButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

export default RegisterScreen;
