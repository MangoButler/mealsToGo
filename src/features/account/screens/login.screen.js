import React, { useContext, useState } from "react";
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
import { renderError } from "../../../utils/validation";
import PasswordInput from "../components/password-input.component";

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    onLogin,
    error: loginError,
    isLoading,
    user,
  } = useContext(AuthenticationContext);

  const handleLogin = async (email, password) => {
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }
    await onLogin(email, password);
  };

  return (
    <AccountBackground>
      <AccountContainer>
        <Text variant="heading" theme={theme}>
          Welcome Back!
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
            Enter your password:
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
        {loginError && (
          <Text variant="error" theme={theme}>
            {renderError(loginError)}
          </Text>
        )}
        <Spacer size="large" position="top">
          <FormActionButton
            mode="contained"
            onPress={() => {
              handleLogin(email, password);
            }}
            buttonColor={theme.colors.ui.primary}
            textColor={theme.colors.text.inverse}
            loading={isLoading}
          >
            Login
          </FormActionButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

export default LoginScreen;
