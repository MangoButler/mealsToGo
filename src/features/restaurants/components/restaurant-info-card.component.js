import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import React from "react";

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding-left: 16px;
  margin-bottom: 10px;
`;
const Description = styled.Text`
  font-size: 12px;
  padding-left: 16px;
  margin-bottom: 5px;
`;

const HighlightSmall = styled(Description)`
  font-size: 9px;
  font-weight: bold;
  font-style: italic;
  color: grey;
`;

const RestaurantCard = styled(Card)`
  margin: 20px;
  align-content: space-between;
`;

const RestaurantCardCover = styled(Card.Cover)`
  margin: auto 20px auto 20px;
  object-fit: contain;
`;

const RestaurantCardContent = styled(Card.Content)`
  margin-top: 10px;
`;

const RestaurantCardActions = styled(Card.Actions)`
  margin-bottom: 10px;
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
        <Title>{name}</Title>
        <Description>{description}</Description>
        {isClosedTemporarely && (
          <HighlightSmall>Temporarely closed</HighlightSmall>
        )}
        {isOpenNow && <HighlightSmall>Open Now</HighlightSmall>}
        {rating && <HighlightSmall>{`Rating: ${rating}`}</HighlightSmall>}
      </RestaurantCardContent>
      <RestaurantCardActions>
        <Button>Check Menu</Button>
        <Button>Reserve</Button>
      </RestaurantCardActions>
    </RestaurantCard>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
