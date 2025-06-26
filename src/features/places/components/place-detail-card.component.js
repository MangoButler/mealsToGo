import styled, { useTheme } from "styled-components/native";
import React, { useContext, useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  PlaceActionsButton,
  PlaceActionsButtonOutline,
  PlaceCardActions,
  PlaceCardContent,
  Info,
  InfoButton,
  InfoContainer,
} from "./places-info-card.styles";
import {
  DetailCard,
  DetailCardCover,
  LoadMoreButton,
  PlaceCreatorImage,
  ReviewContainer,
} from "./place-detail-card.styles";
import Row from "../../../components/spacer/row.component";
import AccordeonList from "../../../components/utility/accordion-list.component";
import MiniMap from "../../../components/utility/mini-map.component";
import { getFeaturesObjects } from "../../../utils/features-list";
import { formatStations } from "../../../utils/station.functions";
import { deletePlace } from "../../../services/places/places.service";
import ConfirmationModal from "../../../components/utility/confirmation-modal.component";
import { returnToPlacesOverview } from "../../../utils/places-navigation.functions";
import { PlacesContext } from "../../../services/places/places.context";
import FavoriteButton from "../../../components/favorites/favorite-button.component";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import { Alert, View } from "react-native";
import {
  CrudActionButton,
  CrudActionContainerScrollView,
  CrudActionsContainer,
} from "../../../components/utility/utility.styles";
import { openInMaps } from "../../../utils/location.functions";
import CreateHangoutModal from "../../hangouts/components/create-hangout-modal.component";
import { ActiveBadge } from "../../../components/utility/active-button-badge.component";
import { HangoutStatsCard } from "../../hangouts/components/hangout-stats-card.component";
import RatingDisplay from "../../../components/places/rating-display.component";
import { useReviews } from "../../../services/reviews/useReviews";
import { SkeletonPlaceholder } from "../../../components/reviews/skeleton-placeholder.component";
import { ReviewCard } from "../../../components/reviews/review-card.component";

const DetailCardContainer = styled.View`
  flex: 1;
`;

const PlaceDetailCardComponent = ({ place = {}, navigation }) => {
  const theme = useTheme();
  const { triggerPlacesRefresh } = useContext(PlacesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { user: currentUser } = useContext(AuthenticationContext);
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
    user: creator = null,
    userId: creatorId = 0,
    hangoutStats,
    reviewCount = 0,
    averageRating = 0,
  } = place;
  const [hangoutModalVisible, setHangoutModalVisible] = useState(false);
  const {
    reviews,
    loading: reviewsLoading,
    hasMore,
    loadReviews,
    error: reviewLoadingError,
  } = useReviews(placeId);

  const featuresObjects = getFeaturesObjects(features);
  const stationsWithIcon = formatStations(
    nearbyStations,
    city === "Jakarta" ? "bus" : "train"
  );

  const handleDelete = async () => {
    const result = await deletePlace(placeId);
    if (result) {
      setModalVisible(false);
      triggerPlacesRefresh();
      await returnToPlacesOverview(navigation);
      Alert.alert("Success", result.message);
    }
  };

  const onGoBack = async () => {
    await returnToPlacesOverview(navigation);
    // navigation.goBack();
  };

  const getDirections = () => {
    openInMaps(location.location.lat, location.location.lng, title);
  };

  const statsText = hangoutStats.completed
    ? `✅ ${hangoutStats.completed} people visited · 📅 ${hangoutStats.scheduled} scheduled hangouts`
    : "Be amongst the first to hang out here!";

  const onConfirmHangout = () => {
    navigation.navigate("Profile", {
      screen: "Main",
    });
  };

  // console.log(reviews); //logging
  return (
    <DetailCardContainer>
      <CrudActionContainerScrollView>
        <DetailCard elevation={0}>
          <FavoriteButton place={place} />
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
                    {area}, {city}
                  </Text>
                </InfoContainer>
              </Row>
              <Row
                topMargin="small"
                bottomMargin="small"
                justifyContent="flex-start"
              >
                <PlaceCreatorImage source={{ uri: creator.profilePicture }} />
                <Text theme={theme} variant="caption">
                  Created by {creator.username}
                </Text>
              </Row>
              <Row topMargin="medium" bottomMargin="medium">
                <RatingDisplay
                  placeId={placeId}
                  averageRating={averageRating}
                  reviewCount={reviewCount}
                />

                <InfoButton
                  textColor={theme.colors.ui.primary}
                  mode="outlined"
                  compact
                  icon="directions"
                  onPress={getDirections}
                >
                  Get Directions
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

              {hangoutStats.total > 0 && (
                <AccordeonList title="Visit Stats" icon="finance">
                  <HangoutStatsCard stats={hangoutStats} />
                </AccordeonList>
              )}
              {reviewCount > 0 && (
                <AccordeonList
                  title="Reviews/Comments"
                  icon="comment-text-outline"
                  onToggle={(expanded) => {
                    if (expanded && reviews.length === 0) {
                      loadReviews(true);
                    }
                  }}
                >
                  {reviewLoadingError ? (
                    <Spacer position="top" size="medium">
                      <Text variant="errorCentered">
                        An error occured, try again!
                      </Text>
                      <Row topMargin="large" justifyContent="center">
                        <LoadMoreButton
                          textColor={theme.colors.ui.primary}
                          mode="outlined"
                          compact
                          icon="comment-processing-outline"
                          onPress={() => {
                            loadReviews(true);
                          }}
                        >
                          Reload
                        </LoadMoreButton>
                      </Row>
                    </Spacer>
                  ) : reviewsLoading ? (
                    <SkeletonPlaceholder count={3 + reviews.length} />
                  ) : (
                    <Spacer position="top" size="medium">
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                      {hasMore && (
                        <Row topMargin="medium" justifyContent="center">
                          <LoadMoreButton
                            textColor={theme.colors.ui.primary}
                            mode="outlined"
                            compact
                            icon="comment-processing-outline"
                            onPress={() => {
                              loadReviews(false);
                            }}
                          >
                            Load More
                          </LoadMoreButton>
                        </Row>
                      )}
                    </Spacer>
                  )}
                </AccordeonList>
              )}
            </Spacer>
          </PlaceCardContent>
          <PlaceCardActions>
            <PlaceActionsButtonOutline
              onPress={onGoBack}
              textColor={theme.colors.ui.primary}
            >
              Go Back
            </PlaceActionsButtonOutline>

            <PlaceActionsButton
              disabled={!isActiveNow}
              buttonColor={
                isActiveNow ? theme.colors.ui.primary : theme.colors.ui.disabled
              }
              textColor={
                !isActiveNow
                  ? theme.colors.ui.primary
                  : theme.colors.text.inverse
              }
              onPress={() => {
                setHangoutModalVisible(true);
              }}
            >
              Hang out here
            </PlaceActionsButton>
          </PlaceCardActions>
        </DetailCard>
        {hangoutModalVisible && (
          <CreateHangoutModal
            onDismiss={() => setHangoutModalVisible(false)}
            visible={hangoutModalVisible}
            place={place}
            onConfirm={onConfirmHangout}
          />
        )}
      </CrudActionContainerScrollView>
      {currentUser && currentUser.id === creatorId && (
        <>
          <CrudActionsContainer>
            <CrudActionButton
              onPress={() => {
                navigation.navigate("UpdatePlace", { place });
              }}
              textColor={theme.colors.text.inverse}
              buttonColor={theme.colors.brand.muted}
              mode="contained"
              icon="map-marker-question-outline"
            >
              Update Place
            </CrudActionButton>
            <CrudActionButton
              onPress={() => {
                setModalVisible(true);
              }}
              buttonColor={theme.colors.ui.error}
              textColor={theme.colors.text.inverse}
              mode="contained"
              icon="map-marker-remove-outline"
            >
              Delete Place
            </CrudActionButton>
          </CrudActionsContainer>
          <ConfirmationModal
            visible={modalVisible}
            onConfirm={handleDelete}
            onDismiss={() => {
              setModalVisible(false);
            }}
          />
        </>
      )}
    </DetailCardContainer>
  );
};

const PlaceDetailCard = React.memo(PlaceDetailCardComponent);
PlaceDetailCard.displayName = "PlaceDetailCard";
export default PlaceDetailCard;
