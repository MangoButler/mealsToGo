import { useTheme } from "styled-components/native";
import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  PlaceActionsButton,
  PlaceActionsButtonOutline,
  PlaceCardActions,
  PlaceCardContent,
  Info,
  IconContainer,
  InfoButton,
  InfoContainer,
} from "./places-info-card.styles";
import { DetailCard, DetailCardCover } from "./place-detail-card.styles";
import Row from "../../../components/spacer/row.component";
import AccordeonList from "../../../components/utility/accordion-list.component";
import { ScrollView } from "react-native";
import MiniMap from "../../../components/utility/mini-map.component";
import { getFeaturesObjects } from "../../../utils/features-list";
import { formatStations } from "../../../utils/station.functions";

const PlaceDetailCardComponent = ({ place = {}, navigation }) => {
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
    location = {
      location: {
        lat: 37.4220936,
        lng: -122.083922,
      },
      viewport: {
        northeast: {
          lat: 37.4234425802915,
          lng: -122.082573019709,
        },
        southwest: {
          lat: 37.4207446197085,
          lng: -122.085270980292,
        },
      },
    },
    nearbyStations = [],
    city = "Others",
  } = place;

  const featuresObjects = getFeaturesObjects(features);
  const stationsWithIcon = formatStations(
    nearbyStations,
    city === "Jakarta" ? "bus" : "train"
  );
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ScrollView>
      <DetailCard elevation={0}>
        <DetailCardCover key={title} source={{ uri: imageUrl }} />

        <PlaceCardContent>
          <Info>
            <Row topMargin="small" bottomMargin="small">
              <InfoContainer>
                <Spacer size={"small"} position={"bottom"}>
                  <Text theme={theme} variant={"label"}>
                    {title}
                  </Text>
                </Spacer>
                <Text theme={theme} variant={"hint"}>
                  {area}
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

          <Spacer position={"top"} size={"medium"}>
            <AccordeonList title="Location" icon="map-marker">
              <MiniMap geometry={location} />
            </AccordeonList>

            <AccordeonList
              items={featuresObjects}
              title="Features"
              icon="details"
            >
              {!features.length && (
                <Spacer position="vertical" size="large">
                  <Text variant="captionCentered" theme={theme}>
                    No special features, but likely a charming view!
                  </Text>
                </Spacer>
              )}
            </AccordeonList>

            <AccordeonList
              icon="subway"
              title="Stations Nearby"
              items={stationsWithIcon}
              cols={1}
            >
              {!nearbyStations.length && (
                <Spacer position="vertical" size="large">
                  <Text variant="captionCentered" theme={theme}>
                    More than 10 minutes walk to closest station!
                  </Text>
                </Spacer>
              )}
            </AccordeonList>
          </Spacer>
        </PlaceCardContent>
        <PlaceCardActions>
          <PlaceActionsButtonOutline
            onPress={navigation.goBack}
            textColor={theme.colors.ui.primary}
          >
            Go Back
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
      </DetailCard>
    </ScrollView>
  );
};

const PlaceDetailCard = React.memo(PlaceDetailCardComponent);
PlaceDetailCard.displayName = "PlaceDetailCard";
export default PlaceDetailCard;
