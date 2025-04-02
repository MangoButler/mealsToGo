import { View } from "react-native";
import { useTheme } from "styled-components/native";
import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  Icon,
  RestaurantCard,
  RestaurantActionsButton,
  RestaurantActionsButtonOutline,
  RestaurantCardActions,
  RestaurantCardContent,
  RestaurantCardCover,
  Info,
  Row,
  RatingContainer,
  InfoButton,
} from "./restaurants-info-card.styles";

export default function RestaurantInfoRestaurantCard({ restaurant = {} }) {
  const theme = useTheme();
  const {
    name = "Test Restaurant",
    icon = "food",
    photos = [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/26/75/c4/jakarta-restaurant-presents.jpg?w=900&h=500&s=1",
    ],
    address = "100 some street",
    isOpenNow = false,
    rating = 3,
    isClosedTemporarely = true,
    description = "A nice little getaway for any adventurer",
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <RestaurantCardContent>
        <Info>
          <Row>
            <View>
              <Spacer size={"small"} position={"bottom"}>
                <Text theme={theme} variant={"label"}>
                  {name}
                </Text>
              </Spacer>
              <Text theme={theme} variant={"hint"}>
                {address}
              </Text>
            </View>
            <Icon icon={icon} textColor={theme.colors.ui.primary} />
          </Row>
          <Row>
            {ratingArray.length ? (
              <RatingContainer>
                {ratingArray.map((_, i) => (
                  <SvgXml xml={star} width={20} height={20} key={i} />
                ))}
              </RatingContainer>
            ) : (
              <Text variant={"caption"} theme={theme}>
                No ratings yet
              </Text>
            )}
            <InfoButton
              textColor={
                isClosedTemporarely
                  ? theme.colors.ui.error
                  : theme.colors.ui.primary
              }
              mode="outlined"
              compact
              icon={isOpenNow ? "door-sliding-open" : "door-sliding-lock"}
            >
              {isOpenNow
                ? "Open Now"
                : isClosedTemporarely
                  ? "Temporarely Closed"
                  : "Closed"}
            </InfoButton>
          </Row>
          <Spacer position={"top"} size={"medium"}>
            <Text variant={"body"} theme={theme}>
              {description}
            </Text>
          </Spacer>
        </Info>
        {isClosedTemporarely && (
          <Text variant={"caption"} theme={theme}>
            Temporarely Closed
          </Text>
        )}
      </RestaurantCardContent>
      <RestaurantCardActions>
        <RestaurantActionsButtonOutline textColor={theme.colors.ui.primary}>
          Check Menu
        </RestaurantActionsButtonOutline>
        <RestaurantActionsButton
          disabled={!isOpenNow}
          buttonColor={
            isOpenNow ? theme.colors.ui.primary : theme.colors.ui.disabled
          }
        >
          Reserve
        </RestaurantActionsButton>
      </RestaurantCardActions>
    </RestaurantCard>
  );
}
