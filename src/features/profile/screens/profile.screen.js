import React, { useContext, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Alert, Image } from "react-native";
import appImage from "../../../../assets/adaptive-icon.png";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  CrudActionButton,
  CrudActionContainerScrollView,
  CrudActionsContainer,
  MaxSpacer,
  RelativePositionWrapper,
} from "../../../components/utility/utility.styles";
import { FormActionButton } from "../../../components/form/form-button.component";
import ConfirmationModal from "../../../components/utility/confirmation-modal.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { deleteUserProfile } from "../../../services/auth/user.service";
import HighlightBar from "../../../components/favorites/highlight-places-bar.component";
import ScrollActionContainer from "../../../components/utility/scroll-action-container.component";
import Row from "../../../components/spacer/row.component";
import MenuButton from "../../../components/utility/menu-button.component";
import { capitalizeEachWord } from "../../../utils/validation";
import {
  fetchPlaceById,
  fetchPlaces,
} from "../../../services/places/places.service";
import LoadingSpinner from "../../../components/utility/loading-spinner.component";
import {
  formatDate,
  formatTime,
  getClosestPendingHangoutWithinTwoHours,
} from "../../../utils/transformations";
import {
  checkInToHangout,
  deleteHangout,
  finishHangout,
} from "../../../services/hangouts/hangouts.service";
import { PlacesContext } from "../../../services/places/places.context";
import {
  Footer,
  SelectorActionButton,
} from "../../../components/utility/checkbox-selector.component";
import CreateHangoutModal from "../../hangouts/components/create-hangout-modal.component";
import { HangoutStatsCard } from "../../hangouts/components/hangout-stats-card.component";
import AccordionList from "../../../components/utility/accordion-list.component";
import HighlightItem from "../../../components/favorites/highlight-item.component";
import { openInMaps } from "../../../utils/location.functions";
import SharePlaceButton from "../../../components/places/share-place-button.component";

const Container = styled.View`
  flex: 1;
  position: relative;
  /* justify-content: center; */
  /* align-items: center; */
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const ProfileContainer = styled.View`
  /* flex: 1; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: ${(props) => props.theme.space[3]} 0;

  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const UserOverviewContainer = styled.View`
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[4]};
`;

export const UserImage = styled(Image)`
  width: 150px;
  height: 150px;
  opacity: 0.8;
  border-radius: 75px;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const MenuToggleButton = styled(MenuButton)`
  flex: 0.3;
`;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user, onLogout, isLoading, setUser, setIsLoading, syncUserProfile } =
    useContext(AuthenticationContext);
  const { removeAllFavorites } = useContext(FavoritesContext);
  const { triggerPlacesRefresh } = useContext(PlacesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [editHangoutModalVisible, setEditHangoutModalVisible] = useState(false);
  const [selectedHangout, setSelectedHangout] = useState(null);
  const { favorites } = useContext(FavoritesContext);
  if (!user) {
    navigation.navigate("Home");
  }

  const [actionLoading, setActionLoading] = useState(false);

  const onDeleteUser = async (password) => {
    setIsLoading(true);

    const result = await deleteUserProfile(setUser, password);
    if (!result) {
      setIsLoading(false);
      return;
    }
    setModalVisible(false);
    setIsLoading(false);
  };

  const logoutUser = async () => {
    await onLogout();
    setModalVisible(false);
  };

  const onCancelHangout = async (hangout) => {
    setActionLoading("deleteHangout");
    const result = await deleteHangout(hangout.hangoutId);
    if (result) {
      Alert.alert("Hangout Cancelled", result.message);
      triggerPlacesRefresh();
      await syncUserProfile();
      setModalVisible(false);
    }
    setActionLoading(false);
  };

  const onRemoveFavorites = () => {
    removeAllFavorites();
    setModalVisible(false);
  };

  const togglePanel = (panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };

  // useEffect(() => {
  //   const syncUser = async () => {
  //     await syncUserProfile();
  //   };
  //   syncUser();
  // }, []);

  const activeHangout = user.hangouts
    ? user.hangouts.find((hangout) => hangout.status === "ACTIVE")
    : null;

  const upcoming = user.hangouts
    ? user.hangouts
        .filter((hangout) => hangout.status === "PENDING")
        .map((hangout) => {
          return {
            ...hangout.place,
            startTime: hangout.startTime,
            hangoutId: hangout.id,
          };
        })
    : [];
  const highlightedItems =
    activePanel === "favorites"
      ? favorites
      : activePanel === "my places"
        ? user.places || []
        : activePanel === "upcoming"
          ? upcoming || []
          : [];

  const renderHangoutCrudButtons = (item) => {
    return (
      <>
        <Spacer size="small" position="top">
          <Text theme={theme} variant={"info"}>
            Starting: {formatDate(item.startTime)} at{" "}
            {formatTime(item.startTime)}
          </Text>
        </Spacer>
        <Spacer size="large" position="top">
          <SharePlaceButton place={item} current={false} />
        </Spacer>

        <Footer>
          <SelectorActionButton
            mode="contained"
            onPress={() => {
              setSelectedHangout(item);
              setModalVisible("cancelHangout");
            }}
            buttonColor={theme.colors.ui.error}
            textColor={theme.colors.text.inverse}
            // disabled={isLoading}
          >
            Cancel
          </SelectorActionButton>
          <SelectorActionButton
            mode="contained"
            textColor={theme.colors.text.inverse}
            buttonColor={theme.colors.brand.muted}
            // disabled={!isSubmitable}
            loading={actionLoading === "deleteHanout"}
            onPress={() => {
              setSelectedHangout(item);
              setEditHangoutModalVisible(true);
            }}
          >
            Edit
          </SelectorActionButton>
        </Footer>
      </>
    );
  };

  const onHighlightCardPress = async (item) => {
    setActionLoading("navigation");
    const refreshedPlace = await fetchPlaceById(item.id);

    navigation.navigate("Places", {
      screen: screen,
      params: { item: refreshedPlace },
    });
    setActionLoading(false);
    setActivePanel(null);
  };
  const onActiveHangoutCardPress = async (
    item,
    screen = "ActiveHangoutPlace"
  ) => {
    setActionLoading("navigation");
    const refreshedPlace = await fetchPlaceById(item.id);
    const refreshedPlaceWithExtraParams = {
      ...refreshedPlace,
      startTime: item.startTime,
      endTime: item.endTime,
      hangoutId: item.hangoutId,
    };

    navigation.navigate("Places", {
      screen: screen,
      params: { item: refreshedPlaceWithExtraParams },
    });
    setActionLoading(false);
    setActivePanel(null);
  };

  let nrPlaces = 0;
  if (user.places && Array.isArray(user.places)) {
    nrPlaces = user.places.length;
  }

  const closestHangout =
    getClosestPendingHangoutWithinTwoHours(user?.hangouts || []) || null;

  const handleCheckIn = async (hangout) => {
    setActionLoading("checkIn");
    const result = await checkInToHangout(hangout);
    if (result) {
      await syncUserProfile();
      triggerPlacesRefresh();
      Alert.alert("Thanks for Joining", result.message);
    }
    setActionLoading(false);
  };
  const handleFinishHangout = async (hangout) => {
    setActionLoading("finishHangout");
    const result = await finishHangout(hangout);
    if (result) {
      triggerPlacesRefresh();
      await syncUserProfile();
      Alert.alert("Check Out Successfull!", result.message);
    }
    setActionLoading(false);
    setModalVisible(false);
  };

  const userDetails = [
    {
      icon: "account-star",
      label: `User Rank: ${capitalizeEachWord(user.role)}`,
      value: "rank",
    },
    {
      icon: "home-group",
      label: `Total hangouts: ${user.hangoutStats ? user.hangoutStats.total : 0}`,
      value: "totalHangouts",
    },
  ];

  if (actionLoading === "navigation") return <LoadingSpinner />;

  return (
    <Container>
      <ScrollActionContainer
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={true}
      >
        <ProfileContainer>
          <Spacer position="bottom" size="medium">
            <Text theme={theme} variant={"labelCentered"}>
              {user.username}
            </Text>
          </Spacer>
          <Spacer position="vertical" size="medium">
            <UserImage
              source={
                user.profilePicture ? { uri: user.profilePicture } : appImage
              }
            />
          </Spacer>

          <Text theme={theme} variant="hint">
            {user.email}
          </Text>
          {closestHangout && (
            <Spacer position="top" size="large">
              <Spacer position="bottom" size="medium">
                <Text variant="labelCentered">Starting soon:</Text>
              </Spacer>
              <HighlightItem
                item={{
                  ...closestHangout.place,
                  startTime: closestHangout.startTime,
                  hangoutId: closestHangout.id,
                }}
                onCardPress={onHighlightCardPress}
                renderActions={() => {
                  return (
                    <>
                      <Spacer size="large" position="top">
                        <SharePlaceButton
                          place={{
                            ...closestHangout.place,
                            startTime: closestHangout.startTime,
                            hangoutId: closestHangout.id,
                          }}
                          current={false}
                        />
                      </Spacer>
                      <Footer>
                        <SelectorActionButton
                          mode="contained"
                          onPress={() => {
                            const { lat, lng } =
                              closestHangout.place?.location.location || {};
                            if (lat && lng) {
                              openInMaps(lat, lng, closestHangout.place?.title);
                            }
                          }}
                          buttonColor={theme.colors.ui.secondary}
                          textColor={theme.colors.text.inverse}
                          // disabled={isLoading}
                          icon="directions"
                        >
                          Get Directions
                        </SelectorActionButton>
                        <SelectorActionButton
                          mode="contained"
                          onPress={async () => {
                            await handleCheckIn(closestHangout);
                          }}
                          buttonColor={theme.colors.ui.success}
                          textColor={theme.colors.text.inverse}
                          // disabled={isLoading}
                          icon="calendar-check-outline"
                          loading={actionLoading === "checkIn"}
                        >
                          Check In
                        </SelectorActionButton>
                      </Footer>
                    </>
                  );
                }}
              />
            </Spacer>
          )}
          {activeHangout && (
            <>
              <Spacer position="top" size="large">
                <HighlightItem
                  onCardPress={onActiveHangoutCardPress}
                  item={{
                    ...activeHangout.place,
                    startTime: activeHangout.startTime,
                    endTime: activeHangout.endTime,
                    hangoutId: activeHangout.id,
                  }}
                  renderActions={() => {
                    return (
                      <>
                        <Spacer size="large" position="top">
                          <SharePlaceButton place={activeHangout.place} />
                        </Spacer>
                        <Footer>
                          <SelectorActionButton
                            mode="contained"
                            onPress={() => {
                              onActiveHangoutCardPress({
                                ...activeHangout.place,
                                startTime: activeHangout.startTime,
                                endTime: activeHangout.endTime,
                                hangoutId: activeHangout.id,
                              });
                            }}
                            buttonColor={theme.colors.ui.secondary}
                            textColor={theme.colors.text.inverse}
                            disabled={actionLoading === "finishHangout"}
                            icon="map-marker-circle"
                          >
                            Details
                          </SelectorActionButton>
                          <SelectorActionButton
                            mode="contained"
                            onPress={() => {
                              setModalVisible("finishHangout");
                            }}
                            buttonColor={theme.colors.ui.primary}
                            textColor={theme.colors.text.inverse}
                            disabled={actionLoading === "finishHangout"}
                            icon="check-outline"
                            loading={actionLoading === "finishHangout"}
                          >
                            Finish
                          </SelectorActionButton>
                        </Footer>
                      </>
                    );
                  }}
                />
              </Spacer>
            </>
          )}
        </ProfileContainer>

        <Row xMargin="large">
          <MenuToggleButton
            icon={activePanel === "favorites" ? "chevron-up" : "heart-outline"}
            onPress={() => togglePanel("favorites")}
          >
            Favorites
          </MenuToggleButton>
          <MenuToggleButton
            icon={
              activePanel === "my places" ? "chevron-up" : "account-outline"
            }
            onPress={() => togglePanel("my places")}
          >
            My Places
          </MenuToggleButton>
          <MenuToggleButton
            icon={activePanel === "upcoming" ? "chevron-up" : "calendar-clock"}
            onPress={() => togglePanel("upcoming")}
          >
            Upcoming
          </MenuToggleButton>
        </Row>
        {activePanel && (
          <ProfileContainer>
            <Text theme={theme} variant={"labelCentered"}>
              {activePanel ? capitalizeEachWord(activePanel) : ""}
            </Text>

            <Spacer position="top" size="medium">
              <HighlightBar
                visible={activePanel !== null}
                panelType={activePanel}
                items={highlightedItems}
                onCardPress={onHighlightCardPress}
                renderActions={
                  activePanel === "upcoming" ? renderHangoutCrudButtons : null
                }
              />
            </Spacer>
            {favorites &&
              favorites.length > 0 &&
              activePanel === "favorites" && (
                <Spacer position="top" size="medium">
                  <FormActionButton
                    onPress={() => {
                      setModalVisible("favorites");
                    }}
                    textColor={theme.colors.ui.primary}
                    mode="outlined"
                    icon="heart-off-outline"
                  >
                    Delete Favorites
                  </FormActionButton>
                </Spacer>
              )}
            {nrPlaces < 3 && activePanel === "my places" && (
              <Spacer position="top" size="medium">
                <FormActionButton
                  onPress={() => {
                    navigation.navigate("Places", {
                      screen: "NewPlace",
                    });
                  }}
                  textColor={theme.colors.ui.primary}
                  mode="outlined"
                  icon="map-marker-plus-outline"
                >
                  Create Place
                </FormActionButton>
              </Spacer>
            )}
          </ProfileContainer>
        )}

        {user.hangoutStats && (
          <Spacer position="top" size="xlarge">
            <Text variant="labelCentered">User Overview</Text>
            <UserOverviewContainer>
              <AccordionList
                title="User Details"
                icon="account-box"
                items={userDetails}
                cols={1}
              />
              <AccordionList title="Visit Details" icon="finance">
                <HangoutStatsCard
                  stats={user.hangoutStats}
                  title="Visit Details"
                  statsHint="of scheduled visits completed."
                />
              </AccordionList>
            </UserOverviewContainer>
          </Spacer>
        )}
        <ProfileContainer>
          <FormActionButton
            onPress={() => {
              setModalVisible("logout");
            }}
            textColor={theme.colors.ui.primary}
            // buttonColor={theme.colors.brand.muted}
            mode="outlined"
            icon="logout"
            loading={isLoading}
          >
            Logout
          </FormActionButton>
        </ProfileContainer>

        <MaxSpacer />
      </ScrollActionContainer>

      <CrudActionsContainer>
        <CrudActionButton
          onPress={() => {
            navigation.navigate("UpdateProfile");
          }}
          textColor={theme.colors.text.inverse}
          buttonColor={theme.colors.brand.muted}
          mode="contained"
          icon="account-edit-outline"
        >
          Update Profile
        </CrudActionButton>
        <CrudActionButton
          onPress={() => {
            setModalVisible("delete");
          }}
          buttonColor={theme.colors.ui.error}
          textColor={theme.colors.text.inverse}
          mode="contained"
          icon="account-remove-outline"
        >
          Delete Profile
        </CrudActionButton>
      </CrudActionsContainer>
      <ConfirmationModal
        visible={modalVisible}
        message={
          modalVisible === "delete"
            ? `For security reasons please enter your password:`
            : "Please confirm"
        }
        requiresPassword={modalVisible === "delete"}
        onConfirm={async (passw = "") => {
          if (modalVisible === "delete") {
            await onDeleteUser(passw);
          } else if (modalVisible === "logout") {
            await logoutUser();
          } else if (modalVisible === "cancelHangout") {
            await onCancelHangout(selectedHangout);
          } else if (modalVisible === "finishHangout") {
            await handleFinishHangout(activeHangout);
          } else {
            await onRemoveFavorites();
          }
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
      {editHangoutModalVisible && (
        <CreateHangoutModal
          visible={editHangoutModalVisible}
          onDismiss={() => setEditHangoutModalVisible(false)}
          hangout={selectedHangout}
          mode="edit"
        />
      )}
    </Container>
  );
};

export default ProfileScreen;

/* <Spacer position="top" size="medium">
                <FormActionButton
                  onPress={() => {
                    handleCheckIn(closestHangout);
                  }}
                  textColor={theme.colors.ui.primary}
                  // buttonColor={theme.colors.brand.muted}
                  mode="outlined"
                  icon="calendar-check-outline"
                  // icon="clock-in"
                  loading={actionLoading === "checkIn"}
                >
                  Check In
                </FormActionButton>
              </Spacer> */

/* <Spacer position="top" size="large">
                <FormActionButton
                  onPress={async () => {
                    await handleFinishHangout(activeHangout);
                  }}
                  textColor={theme.colors.ui.primary}
                  // buttonColor={theme.colors.brand.muted}
                  mode="outlined"
                  icon="check-outline"
                  // icon="clock-in"
                  loading={actionLoading === "finishHangout"}
                >
                  Finish Hangout
                </FormActionButton>
              </Spacer> */
