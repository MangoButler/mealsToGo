import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import React from "react";
import { theme } from "../../../infrastructure/theme";

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  /* font-weight: ${(props) => props.theme.fontWeights.bold}; */

  color: ${(props) => props.theme.colors.ui.primary};
`;
const Description = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  /* padding-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[1]}; */
`;

const HighlightSmall = styled(Description)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-style: italic;
  color: ${(props) => props.theme.colors.ui.secondary};
`;

const RestaurantCard = styled(Card)`
  margin: ${(props) => props.theme.space[3]};
  align-content: space-between;
`;

const RestaurantCardCover = styled(Card.Cover)`
  margin: auto ${(props) => props.theme.space[3]};
  object-fit: contain;
`;

const RestaurantCardContent = styled(Card.Content)`
  margin-top: ${(props) => props.theme.space[2]};
`;

const RestaurantCardActions = styled(Card.Actions)`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const RestaurantActionsButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.ui.primary};
  color: ${(props) => props.theme.colors.ui.quaternary};
`;

const RestaurantActionsButtonOutline = styled(RestaurantActionsButton)`
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  color: ${(props) => props.theme.colors.ui.primary} !important;
  border-color: ${(props) => props.theme.colors.ui.primary};
`;

const Info = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const LeftContent = (props) => <Avatar.Icon {...props} />;

export default function RestaurantInfoRestaurantCard({ restaurant = {} }) {
  const {
    name = "Test Restaurant",
    icon = "food",
    photos = [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/26/75/c4/jakarta-restaurant-presents.jpg?w=900&h=500&s=1",
    ],
    address = "100 some street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarely = false,
    description = "A nice little getaway for any adventurer",
  } = restaurant;

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCard.Title
        title={name}
        subtitle={address}
        left={LeftContent.bind(null, {
          icon: icon,
          style: styles.icon,
          size: 40,
        })}
        titleStyle={styles.title}
      />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <RestaurantCardContent>
        <Info>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </Info>
        {isClosedTemporarely && (
          <HighlightSmall>Temporarely closed</HighlightSmall>
        )}
        {isOpenNow && <HighlightSmall>Open Now</HighlightSmall>}
        {rating && <HighlightSmall>{`Rating: ${rating}`}</HighlightSmall>}
      </RestaurantCardContent>
      <RestaurantCardActions>
        <RestaurantActionsButtonOutline textColor={theme.colors.ui.primary}>
          Check Menu
        </RestaurantActionsButtonOutline>
        <RestaurantActionsButton>Reserve</RestaurantActionsButton>
      </RestaurantCardActions>
    </RestaurantCard>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
    backgroundColor: theme.colors.ui.primary,
    color: theme.colors.ui.quaternary,
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: theme.fonts.heading,
  },
});
