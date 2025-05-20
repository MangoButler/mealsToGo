import React, { useContext } from "react";
import AppNavigator from "./app.navigator";
import { AuthenticationContext } from "../../services/auth/auth.context";
import AccountNavigator from "./account.navigator";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import CreateProfileScreen from "../../features/account/screens/create-profile.screen";
const NavContainer = styled(NavigationContainer)`
  margin-top: ${(props) => props.theme.space[4]};
`;

export const Navigation = () => {
  const { user } = useContext(AuthenticationContext);

  let content;

  if (!user) {
    content = <AccountNavigator />;
  } else if (!user.id || !user.role) {
    content = <CreateProfileScreen />;
  } else {
    content = <AppNavigator />;
  }

  return <NavContainer>{content}</NavContainer>;

  // return (
  //   <NavContainer>
  //     {user ? <AppNavigator /> : <AccountNavigator />}
  //   </NavContainer>
  // );
};
