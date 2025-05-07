import { useTheme } from "styled-components/native";
import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  PlaceCard,
  PlaceActionsButton,
  PlaceActionsButtonOutline,
  PlaceCardActions,
  PlaceCardContent,
  PlaceCardCover,
  Info,
  IconContainer,
  CategoryIconContainer,
  InfoButton,
  InfoContainer,
} from "./places-info-card.styles";
import { Icon } from "react-native-paper";
import Row from "../../../components/spacer/row.component";
import { TouchableOpacity } from "react-native";
import { getFeaturesObjects } from "../../../utils/features-list";
import { getWalkingTimeInMinutes } from "../../../utils/station.functions";
import FavoriteButton from "../../../components/favorites/favorite-button.component";

const PlaceInfoCardComponent = ({ place = {}, onDetailClick = () => {} }) => {
  const theme = useTheme();
  const {
    title = "Test Place",
    id: placeId = "1",
    features = [
      "conbini",
      "toilet",
      "benches",
      "take-away",
      "sakura-spot",
      "table",
      "raincover",
      "supermarket",
    ],
    imageUrl = "https://res.cloudinary.com/dg5kd3rfa/image/upload/v1745046201/place_images/ng7gi6asdeb9kvweusu7.jpg",
    area = "100 some street",
    isOpenNow = true,
    rating = 3,
    isClosedTemporarely = false,
    description = "A nice little getaway for any adventurer",
    nearbyStations = [],
    city = "Others",
  } = place;

  const featuresObjects = getFeaturesObjects(features);

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <PlaceCard elevation={5}>
      <FavoriteButton place={place} />
      <TouchableOpacity onPress={onDetailClick}>
        <PlaceCardCover key={title} source={{ uri: imageUrl }} />
      </TouchableOpacity>
      <PlaceCardContent>
        <Info>
          <Row topMargin="small" bottomMargin="small">
            <InfoContainer>
              <Spacer size={"small"} position={"bottom"}>
                <Text theme={theme} variant={"label"}>
                  {title}
                </Text>
              </Spacer>
              <Spacer size="small" position="bottom">
                <Text theme={theme} variant={"hint"}>
                  {area}, {city}
                </Text>
              </Spacer>
              <Text theme={theme} variant={"caption"}>
                {nearbyStations && nearbyStations.length
                  ? `${nearbyStations[0].name} around ${getWalkingTimeInMinutes(nearbyStations[0].distance)} min`
                  : "More than 10 min to closest station."}
              </Text>
            </InfoContainer>
            <Spacer position={"right"} size={"small"}>
              <CategoryIconContainer>
                {featuresObjects.slice(0, 3).map((feature) => (
                  <Icon
                    source={feature.icon}
                    key={`icon-${placeId}-${feature.value}`}
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
              <Text variant={"captionCentered"} theme={theme}>
                No ratings yet...
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
      </PlaceCardContent>
      <PlaceCardActions>
        <PlaceActionsButtonOutline
          onPress={onDetailClick}
          textColor={theme.colors.ui.primary}
        >
          Check Menu
        </PlaceActionsButtonOutline>
        <PlaceActionsButton
          disabled={!isOpenNow}
          buttonColor={
            isOpenNow ? theme.colors.ui.primary : theme.colors.ui.disabled
          }
        >
          Reserve
        </PlaceActionsButton>
      </PlaceCardActions>
    </PlaceCard>
  );
};

const PlaceInfoCard = React.memo(PlaceInfoCardComponent);
PlaceInfoCard.displayName = "PlaceInfoCard";
export default PlaceInfoCard;
