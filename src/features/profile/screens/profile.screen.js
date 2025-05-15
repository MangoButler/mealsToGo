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

const Message = styled(Text)`
  margin-top: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.error};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  text-align: center;
`;

const UserImage = styled(Image)`
  width: 150px;
  height: 150px;
  opacity: 0.8;
  border-radius: 75px;
`;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useContext(AuthenticationContext);
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) {
    navigation.navigate("Home");
  }
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
            setModalVisible(true);
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
        onConfirm={() => {}}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
    </Container>
  );
};

export default ProfileScreen;
