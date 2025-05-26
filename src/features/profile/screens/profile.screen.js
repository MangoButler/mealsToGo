import React, { useContext, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Image } from "react-native";
import appImage from "../../../../assets/adaptive-icon.png";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CrudActionsContainer } from "../../../components/utility/utility.styles";
import { FormActionButton } from "../../../components/form/form-button.component";
import ConfirmationModal from "../../../components/utility/confirmation-modal.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { deleteUserProfile } from "../../../services/auth/user.service";
import HighlightBar from "../../../components/favorites/highlight-places-bar.component";
import ScrollActionContainer from "../../../components/utility/scroll-action-container.component";
import Row from "../../../components/spacer/row.component";
import MenuButton from "../../../components/utility/menu-button.component";
import { capitalizeEachWord } from "../../../utils/validation";

const Container = styled.View`
  flex: 1;
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

const UserImage = styled(Image)`
  width: 150px;
  height: 150px;
  opacity: 0.8;
  border-radius: 75px;
`;

const MenuToggleButton = styled(MenuButton)`
  flex: 0.3;
`;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user, onLogout, isLoading, setUser, setIsLoading } = useContext(
    AuthenticationContext
  );
  const { removeAllFavorites } = useContext(FavoritesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const { favorites } = useContext(FavoritesContext);
  if (!user) {
    navigation.navigate("Home");
  }

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

  const onRemoveFavorites = () => {
    removeAllFavorites();
    setModalVisible(false);
  };

  const togglePanel = (panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };
  const recents = [];
  const highlightedItems =
    activePanel === "favorites"
      ? favorites
      : activePanel === "my places"
        ? user.places
        : activePanel === "recents"
          ? recents
          : [];

  const onHighlightCardPress = (item) => {
    navigation.navigate("Places", {
      screen: "PlaceDetail",
      params: { item },
    });
  };

  return (
    <>
      <Container>
        <ScrollActionContainer>
          <ProfileContainer>
            <Text theme={theme} variant={"labelCentered"}>
              {user.username}
            </Text>
            <Spacer position="vertical" size="large">
              <UserImage
                source={
                  user.profilePicture ? { uri: user.profilePicture } : appImage
                }
              />
            </Spacer>

            <Text theme={theme} variant="hint">
              {user.email}
            </Text>

            <Spacer position="top" size="large">
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
            </Spacer>
          </ProfileContainer>

          <Row xMargin="large">
            <MenuToggleButton
              icon={
                activePanel === "favorites" ? "chevron-up" : "heart-outline"
              }
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
              icon={activePanel === "recents" ? "chevron-up" : "calendar-clock"}
              onPress={() => togglePanel("recents")}
            >
              Recent
            </MenuToggleButton>
          </Row>

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
              />
            </Spacer>
            {favorites.length > 0 && activePanel === "favorites" && (
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
            {user.places.length < 3 && activePanel === "my places" && (
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
        </ScrollActionContainer>
      </Container>
      <CrudActionsContainer>
        <FormActionButton
          onPress={() => {
            navigation.navigate("UpdateProfile");
          }}
          textColor={theme.colors.text.inverse}
          buttonColor={theme.colors.brand.muted}
          mode="contained"
          icon="account-edit-outline"
        >
          Update Profile
        </FormActionButton>
        <FormActionButton
          onPress={() => {
            setModalVisible("delete");
          }}
          buttonColor={theme.colors.ui.error}
          textColor={theme.colors.text.inverse}
          mode="contained"
          icon="account-remove-outline"
        >
          Delete Profile
        </FormActionButton>
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
          } else {
            await onRemoveFavorites();
          }
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default ProfileScreen;
