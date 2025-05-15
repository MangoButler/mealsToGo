import React from "react";
import { Text } from "../../../components/typography/text.component";
import {
  AccountBackground,
  AccountContainer,
} from "../components/account.styles";
// import { ButtonRow } from "../../../components/utility/utility.styles";
import { useTheme } from "styled-components/native";
import { FormActionButton } from "../../../components/form/form-button.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import styled from "styled-components/native";

const ButtonRow = styled.View`
  flex-direction: row;
  /* justify-content: space-between; */
  margin-top: ${(props) => props.theme.space[3]};
  gap: ${(props) => props.theme.space[4]};
`;

const AccountScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <AccountBackground>
      <AccountContainer>
        <Text theme={theme} variant="heading">
          Sign up to join the fun!
        </Text>
        <Spacer position="top" size="large">
          <Text theme={theme} variant="hint">
            (or Login via the button below!)
          </Text>
        </Spacer>
        {/* <Spacer position="top" size="medium">
          <Text theme={theme} variant="hint">
            Welcome to CanAndGo.co the first street drinking exclusive app.
            Share your favorite spots for relaxing & people watching in the big
            city!
          </Text>
        </Spacer>
        <Spacer position="top" size="small">
          <Text theme={theme} variant="hint">
            Share your favorite spots for relaxing & people watching in the big
            city!
          </Text>
        </Spacer> */}
        <ButtonRow>
          <FormActionButton
            mode="outlined"
            onPress={() => {
              navigation.navigate("Login");
            }}
            textColor={theme.colors.ui.primary}
          >
            Login
          </FormActionButton>
          <FormActionButton
            mode="contained"
            onPress={() => {
              navigation.navigate("Register");
            }}
            buttonColor={theme.colors.ui.primary}
            textColor={theme.colors.text.inverse}
          >
            Sign Up
          </FormActionButton>
        </ButtonRow>
      </AccountContainer>
    </AccountBackground>
  );
};

export default AccountScreen;
