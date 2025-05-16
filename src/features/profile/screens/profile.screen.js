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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const ProfileContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const UserImage = styled(Image)`
  width: 150px;
  height: 150px;
  opacity: 0.8;
  border-radius: 75px;
`;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user, onLogout, isLoading } = useContext(AuthenticationContext);
  const { removeAllFavorites } = useContext(FavoritesContext);
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) {
    navigation.navigate("Home");
  }

  const onDeleteUser = () => {};

  const logoutUser = async () => {
    await onLogout();
    setModalVisible(false);
  };

  const onRemoveFavorites = () => {
    removeAllFavorites();
    setModalVisible(false);
  };

  return (
    <Container>
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

        <Spacer position="vertical" size="large">
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
        <FormActionButton
          onPress={() => {
            setModalVisible("favorites");
          }}
          textColor={theme.colors.ui.primary}
          // buttonColor={theme.colors.brand.muted}
          mode="outlined"
          icon="heart-off-outline"
        >
          Delete Favorites
        </FormActionButton>
      </ProfileContainer>
      <CrudActionsContainer>
        <FormActionButton
          onPress={() => {
            navigation.navigate("UpdateProfile");
          }}
          textColor={theme.colors.text.inverse}
          buttonColor={theme.colors.brand.muted}
          mode="contained"
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
        >
          Delete Profile
        </FormActionButton>
      </CrudActionsContainer>
      <ConfirmationModal
        visible={modalVisible}
        message={
          modalVisible === "delete"
            ? "We hate to see you go..."
            : "Please confirm"
        }
        onConfirm={() => {
          if (modalVisible === "delete") {
            onDeleteUser();
          } else if (modalVisible === "logout") {
            logoutUser();
          } else {
            onRemoveFavorites();
          }
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
    </Container>
  );
};

export default ProfileScreen;
