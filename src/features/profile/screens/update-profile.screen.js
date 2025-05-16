import React, { useContext, useEffect, useState } from "react";
import {
  AccountBackground,
  AccountContainer,
} from "../../account/components/account.styles";
import FormTextInput from "../../../components/form/form-text-input.component";
import { useTheme } from "styled-components";
import { FormActionButton } from "../../../components/form/form-button.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/auth/auth.context";
import ImageUpload from "../../../components/form/image-upload.component";
import { updateUserProfile } from "../../../services/auth/user.service";
import CountrySelector from "../../account/components/country-input.component";
import { InputWrapper } from "../../../components/utility/utility.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "../../../services/places/places-api-url";

const UpdateProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticationContext);

  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [favDrink, setFavDrink] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername(user.username || user.email.split("@")[0]);
    setFavDrink(user.favoriteDrink || "");
    setCountry(user.country || "");
    setProfilePicture(user.profilePicture || "");
  }, [user, navigation]);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const result = await updateUserProfile({
      newUsername: username,
      newFavoriteDrink: favDrink,
      newCountry: country,
      newProfilePicture: profilePicture,
      user: user,
    });

    if (result) {
      setUser({ ...result });
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result));
    }
    setIsLoading(false);
    navigation.navigate("Main");
  };

  return (
    <AccountBackground>
      <AccountContainer>
        <Text variant="heading" theme={theme}>
          Tell us about yourself:
        </Text>
        <Spacer position="top" size="medium">
          <Text variant="hintCentered" theme={theme}>
            Profile Picture:
          </Text>
          <ImageUpload
            imageUri={profilePicture}
            onImageUploadSuccess={(uri) => setProfilePicture(uri)}
          />
        </Spacer>

        <InputWrapper>
          <Text variant="hint" theme={theme}>
            Username:
          </Text>
          <FormTextInput
            value={username}
            label="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />

          <Text variant="hint" theme={theme}>
            Favorite Drink:
          </Text>
          <FormTextInput
            value={favDrink}
            label="Favorite Drink"
            onChangeText={(text) => {
              setFavDrink(text);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Text variant="hint" theme={theme}>
            Select Country:
          </Text>
          <CountrySelector value={country} onChange={setCountry} />
        </InputWrapper>

        <Spacer size="large" position="top">
          <FormActionButton
            mode="contained"
            onPress={() => {
              handleUpdateProfile(false);
            }}
            buttonColor={theme.colors.ui.primary}
            textColor={theme.colors.text.inverse}
            loading={isLoading}
            disabled={username.length < 3 || isLoading}
          >
            Update Profile
          </FormActionButton>
        </Spacer>
        <Spacer position="top" size="large">
          <FormActionButton
            mode="outlined"
            onPress={() => {
              navigation.navigate("Main");
            }}
            textColor={theme.colors.ui.primary}
            disabled={isLoading}
          >
            Cancel
          </FormActionButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

export default UpdateProfileScreen;
