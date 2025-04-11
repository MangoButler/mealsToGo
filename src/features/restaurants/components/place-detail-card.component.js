import { useTheme } from "styled-components/native";
import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  RestaurantActionsButton,
  RestaurantActionsButtonOutline,
  RestaurantCardActions,
  RestaurantCardContent,
  Info,
  IconContainer,
  InfoButton,
  InfoContainer,
} from "./restaurants-info-card.styles";
import { DetailCard, DetailCardCover } from "./place-detail-card.styles";
import Row from "../../../components/spacer/row.component";
import AccordeonList from "../../../components/utility/accordion-list.component";
import { ScrollView } from "react-native";

const PlaceDetailCardComponent = ({ place = {} }) => {
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
  } = place;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ScrollView>
      <DetailCard elevation={0}>
        <DetailCardCover key={name} source={{ uri: photos[0] }} />

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
          {/* Details Drawers */}
          <Spacer position={"top"} size={"medium"}>
            <AccordeonList items={icons} icon="details" title="Features" />
            <AccordeonList
              icon="subway"
              title="Stations Nearby"
              items={[
                { title: "Shibuya", icon: "train" },
                { title: "Omote-sando", icon: "train" },
              ]}
            />
          </Spacer>
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
      </DetailCard>
    </ScrollView>
  );
};

const PlaceDetailCard = React.memo(PlaceDetailCardComponent);
PlaceDetailCard.displayName = "PlaceDetailCard";
export default PlaceDetailCard;
