import styled, { useTheme } from "styled-components/native";
import React, { useContext, useEffect, useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  PlaceActionsButtonOutline,
  PlaceCardActions,
  PlaceCardContent,
  Info,
  InfoContainer,
} from "./places-info-card.styles";
import {
  DetailCard,
  DetailCardCover,
  LoadMoreButton,
  PlaceCreatorImage,
} from "./place-detail-card.styles";
import Row from "../../../components/spacer/row.component";
import AccordeonList from "../../../components/utility/accordion-list.component";
import MiniMap from "../../../components/utility/mini-map.component";
import { getFeaturesObjects } from "../../../utils/features-list";
import { formatStations } from "../../../utils/station.functions";
import ConfirmationModal from "../../../components/utility/confirmation-modal.component";
import { returnToPlacesOverview } from "../../../utils/places-navigation.functions";
import { PlacesContext } from "../../../services/places/places.context";
import FavoriteButton from "../../../components/favorites/favorite-button.component";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import { Alert } from "react-native";
import { CrudActionContainerScrollView } from "../../../components/utility/utility.styles";
import { ActiveBadge } from "../../../components/utility/active-button-badge.component";
import { HangoutStatsCard } from "../../hangouts/components/hangout-stats-card.component";
import SharePlaceButton from "../../../components/places/share-place-button.component";
import { SelectorActionButton } from "../../../components/utility/checkbox-selector.component";
import {
  formatTime,
  getApproximateTimeDifference,
  isInPast,
} from "../../../utils/transformations";
import {
  finishHangout,
  getActiveUsersForPlace,
} from "../../../services/hangouts/hangouts.service";
import LoadingSpinner from "../../../components/utility/loading-spinner.component";
import ActiveUsersGrid from "../../../components/hangouts/active-users-grid.component";
import { getWelcomeMessage } from "../../../utils/get-welcome-message.function";
import RatingDisplay from "../../../components/places/rating-display.component";
import { SkeletonPlaceholder } from "../../../components/reviews/skeleton-placeholder.component";
import { ReviewCard } from "../../../components/reviews/review-card.component";
import { useReviews } from "../../../services/reviews/useReviews";

const DetailCardContainer = styled.View`
  flex: 1;
`;

const ActiveHangoutPlaceCardComponent = ({ place = {}, navigation }) => {
  const theme = useTheme();
  const { triggerPlacesRefresh } = useContext(PlacesContext);
  const [modalVisible, setModalVisible] = useState(false);
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
    endTime,
    startTime,
    hangoutId,
    averageRating = 0,
    reviewCount = 0,
  } = place;

  const { user, syncUserProfile } = useContext(AuthenticationContext);
  const activeHangout = user.hangouts
    ? user.hangouts.find((hangout) => hangout.status === "ACTIVE")
    : null;

  const {
    reviews,
    loading: reviewsLoading,
    hasMore,
    loadReviews,
    error: reviewLoadingError,
  } = useReviews(placeId);

  const onGoBack = async () => {
    await returnToPlacesOverview(navigation);
  };

  const [activeUsers, setActiveUsers] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!user || !activeHangout || activeHangout.place.id !== placeId) {
      onGoBack();
    }
  }, []);

  //   useEffect(() => {
  //     const fetchActiveUsers = async () => {
  //       setActionLoading("users");
  //       const users = await getActiveUsersForPlace(placeId);
  //       setActiveUsers(users.filter((u) => u.id !== user.id));
  //       setActionLoading(false);
  //     };

  //     fetchActiveUsers();
  //   }, [placeId]);

  useEffect(() => {
    const fetchData = async () => {
      setActionLoading("usersAndWelcome");

      try {
        const [users, welcomeMsg] = await Promise.all([
          getActiveUsersForPlace(placeId),
          getWelcomeMessage(),
        ]);

        setActiveUsers(users.filter((u) => u.id !== user.id));
        setWelcomeMessage(welcomeMsg);
      } catch (error) {
        console.error(
          "Failed to fetch active users or welcome message:",
          error
        );
        setWelcomeMessage("Welcome to your hangout!"); // Fallback
      } finally {
        setActionLoading(false);
      }
    };

    fetchData();
  }, [placeId]);

  const handleFinishHangout = async (hangout) => {
    setActionLoading("finishHangout");
    const result = await finishHangout(hangout);
    if (result) {
      triggerPlacesRefresh();
      await syncUserProfile();
      Alert.alert("Check Out Successfull!", result.message);
      setActionLoading(false);
      setModalVisible(false);
      navigation.navigate("ReviewScreen", { hangout });
    } else {
      setActionLoading(false);
    }
  };

  const featuresObjects = getFeaturesObjects(features);
  const stationsWithIcon = formatStations(
    nearbyStations,
    city === "Jakarta" ? "bus" : "train"
  );

  //   const getDirections = () => {
  //     openInMaps(location.location.lat, location.location.lng, title);
  //   };

  const statsText = "Be amongst the first to hang out here!";

  if (actionLoading === "usersAndWelcome") {
    return <LoadingSpinner />;
  }
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
                    <Text variant="info">{welcomeMessage}</Text>
                    <Text theme={theme} variant={"label"}>
                      {title}
                    </Text>
                  </Spacer>
                  <Spacer size={"small"} position={"bottom"}>
                    <Text theme={theme} variant={"hint"}>
                      {area}, {city}
                    </Text>
                  </Spacer>
                  <Text variant="caption" theme={theme}>
                    {!isInPast(endTime)
                      ? `Hanging out until: ${formatTime(endTime)} (${getApproximateTimeDifference(endTime)} longer)`
                      : "Officially ended (but stay as long as you like)"}
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
                <SharePlaceButton place={place} />
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
              {activeUsers.length > 0 && (
                <AccordeonList icon="account-group" title="Who's here now?">
                  <ActiveUsersGrid users={activeUsers} />
                </AccordeonList>
              )}

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

              {/* Adding Reviews */}

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

            <SelectorActionButton
              mode="contained"
              onPress={() => setModalVisible(true)}
              buttonColor={theme.colors.ui.primary}
              textColor={theme.colors.text.inverse}
              disabled={actionLoading === "finishHangout"}
              icon="check-outline"
              loading={actionLoading === "finishHangout"}
            >
              Finish
            </SelectorActionButton>
          </PlaceCardActions>
        </DetailCard>
      </CrudActionContainerScrollView>
      <ConfirmationModal
        visible={modalVisible}
        onConfirm={async () => {
          await handleFinishHangout(activeHangout);
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
        message="Confirm below to check out."
        title="Leaving already?"
      />
    </DetailCardContainer>
  );
};

const ActiveHangoutPlaceCard = React.memo(ActiveHangoutPlaceCardComponent);
ActiveHangoutPlaceCard.displayName = "ActiveHangoutPlaceCard";
export default ActiveHangoutPlaceCard;
