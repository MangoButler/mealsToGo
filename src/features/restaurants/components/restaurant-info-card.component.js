import { useTheme } from "styled-components/native";
import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  RestaurantCard,
  RestaurantActionsButton,
  RestaurantActionsButtonOutline,
  RestaurantCardActions,
  RestaurantCardContent,
  RestaurantCardCover,
  Info,
  IconContainer,
  CategoryIconContainer,
  InfoButton,
  InfoContainer,
} from "./restaurants-info-card.styles";
import { Icon } from "react-native-paper";
import Row from "../../../components/spacer/row.component";
import { Pressable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

const RestaurantInfoCardComponent = ({
  restaurant = {},
  onDetailClick = () => {},
}) => {
  const theme = useTheme();
  const {
    name = "Test Restaurant",
    placeId = "1",
    icons = ["food", "food-takeout-box", "food-variant"],
    photos = [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/26/75/c4/jakarta-restaurant-presents.jpg?w=900&h=500&s=1",
    ],
    address = "100 some street",
    isOpenNow = true,
    rating = 3,
    isClosedTemporarely = false,
    description = "A nice little getaway for any adventurer",
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <TouchableOpacity onPress={onDetailClick}>
        <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      </TouchableOpacity>
      <RestaurantCardContent>
        <Info>
          <Row topMargin="small" bottomMargin="small">
            <InfoContainer>
              <Spacer size={"small"} position={"bottom"}>
                <Text theme={theme} variant={"label"}>
                  {name}
                </Text>
              </Spacer>
              <Text theme={theme} variant={"hint"}>
                {address}
              </Text>
            </InfoContainer>
            <Spacer position={"right"} size={"small"}>
              <CategoryIconContainer>
                {icons.map((icon, i) => (
                  <Icon
                    source={icon}
                    key={`icon-${placeId}-${i}`}
                    size={20}
                    color={theme.colors.ui.primary}
                  />
                ))}
              </CategoryIconContainer>
            </Spacer>
          </Row>
          <Row topMargin="none" bottomMargin="medium">
            {ratingArray.length ? (
              <IconContainer>
                {ratingArray.map((_, i) => (
                  <SvgXml
                    xml={star}
                    width={20}
                    height={20}
                    key={`star-${placeId}-${i}`}
                  />
                ))}
              </IconContainer>
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
              icon={
                isOpenNow && !isClosedTemporarely
                  ? "door-sliding-open"
                  : "door-sliding-lock"
              }
            >
              {isClosedTemporarely
                ? "Temporarely Closed"
                : isOpenNow
                  ? "Open Now"
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
        <RestaurantActionsButtonOutline
          onPress={onDetailClick}
          textColor={theme.colors.ui.primary}
        >
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
};

const RestaurantInfoCard = React.memo(RestaurantInfoCardComponent);
RestaurantInfoCard.displayName = "RestaurantInfoCard";
export default RestaurantInfoCard;
