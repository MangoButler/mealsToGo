import React from "react";
import { Card, Avatar, Divider } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "../typography/text.component";
import {
  getDrinkEmoji,
  getDrinkIcon,
  parseNumber,
} from "../../utils/transformations";
import { getCountryLabel } from "../../utils/countryList";
import { FontAwesome5 } from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";

const StyledCard = styled(Card)`
  flex: 1;
  margin: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Content = styled(Card.Content)`
  align-items: center;
`;

const Name = styled(Text)`
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  font-weight: bold;
`;

const Info = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  /* color: gray; */
  /* margin-top: ${(props) => props.theme.space[1]}; */
  text-align: center;
`;

const ActiveUserCard = ({ user }) => {
  const theme = useTheme();
  const { username, profilePicture, country, favoriteDrink } = user;
  const drinkEmoji = getDrinkEmoji(favoriteDrink);
  const countryLabel = getCountryLabel(country);

  return (
    <StyledCard>
      <Content>
        <Avatar.Image source={{ uri: profilePicture }} size={60} />
        <Name variant="centeredInfoBold">{username}</Name>

        <Info variant="hint">From:</Info>
        <Info variant="hint">{countryLabel}</Info>

        <Spacer
          position="bottom"
          size="medium"
          showLine={true}
          lineColor={theme.colors.ui.primary}
        />

        <Info variant="hint">Loves:</Info>
        <Info variant="hint">
          {drinkEmoji} {favoriteDrink}
        </Info>
      </Content>
    </StyledCard>
  );
};

export default ActiveUserCard;
