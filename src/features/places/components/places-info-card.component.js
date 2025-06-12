import { useTheme } from "styled-components/native";
import React, { useState } from "react";
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
import { openInMaps } from "../../../utils/location.functions";
import CreateHangoutModal from "../../hangouts/components/create-hangout-modal.component";
import { ActiveBadge } from "../../../components/utility/active-button-badge.component";

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
    isActiveNow = true,
    rating = 3,
    isClosedTemporarely = false,
    description = "A nice little getaway for any adventurer",
    nearbyStations = [],
    city = "Others",
    location = {
      location: { lat: -6.1613083, lng: 106.9049817 },
      viewport: { northeast: -6.1613083, southwest: 106.9049817 },
    },
    hangoutStats,
  } = place;

  const [hangoutModalVisible, setHangoutModalVisible] = useState(false);

  const featuresObjects = getFeaturesObjects(features);

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  const getDirections = () => {
    openInMaps(location.location.lat, location.location.lng, title);
  };

  const statsText = hangoutStats.completed
    ? `✅ ${hangoutStats.completed} people visited · 📅 ${hangoutStats.scheduled} scheduled hangouts`
    : "Be amongst the first to hang out here!";

  return (
    <>
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
                mode="outlined"
                compact
                icon="directions"
                onPress={getDirections}
              >
                Get directions
              </InfoButton>
            </Row>

            {/* inserting the stats */}
            {hangoutStats.total > 0 ? (
              <Row
                topMargin="medium"
                bottomMargin="medium"
                justifyContent="flex-start"
              >
                <ActiveBadge
                  activeCount={hangoutStats.total}
                  message="visits"
                  icon="check-circle-outline"
                  color={theme.colors.ui.secondary}
                />
                {hangoutStats.scheduled > 0 && (
                  <>
                    <Spacer position="horizontal" size="small">
                      <Text variant="info"> · </Text>
                    </Spacer>
                    <ActiveBadge
                      activeCount={hangoutStats.scheduled}
                      message="scheduled"
                      icon="calendar"
                      color={theme.colors.brand.muted}
                    />
                  </>
                )}

                {hangoutStats.active > 0 && (
                  <>
                    <Spacer position="horizontal" size="small">
                      <Text variant="info"> · </Text>
                    </Spacer>
                    <ActiveBadge activeCount={hangoutStats.active} />
                  </>
                )}
              </Row>
            ) : (
              <Spacer position="vertical" size="medium">
                <Text variant="info">{statsText}</Text>
              </Spacer>
            )}

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
            Check Details
          </PlaceActionsButtonOutline>
          <PlaceActionsButton
            disabled={!isActiveNow}
            buttonColor={
              isActiveNow ? theme.colors.ui.primary : theme.colors.ui.disabled
            }
            textColor={
              !isActiveNow ? theme.colors.ui.primary : theme.colors.text.inverse
            }
            onPress={() => {
              setHangoutModalVisible(true);
            }}
          >
            Hang out here
          </PlaceActionsButton>
        </PlaceCardActions>
      </PlaceCard>
      {hangoutModalVisible && (
        <CreateHangoutModal
          onDismiss={() => setHangoutModalVisible(false)}
          visible={hangoutModalVisible}
          place={place}
        />
      )}
    </>
  );
};

const PlaceInfoCard = React.memo(PlaceInfoCardComponent);
PlaceInfoCard.displayName = "PlaceInfoCard";
export default PlaceInfoCard;
