import React, { useContext, useEffect, useState } from "react";
import {
  AccountBackground,
  AccountContainer,
} from "../components/account.styles";
import FormTextInput from "../../../components/form/form-text-input.component";
import { useTheme } from "styled-components";
import { FormActionButton } from "../../../components/form/form-button.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/auth/auth.context";
import ImageUpload from "../../../components/form/image-upload.component";
import CountrySelector from "../components/country-input.component";
import { createUserProfile } from "../../../services/auth/user.service";
import { InputWrapper } from "../../../components/utility/utility.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "../../../services/places/places-api-url";

const CreateProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [favDrink, setFavDrink] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Register");
    } else if (user.email) {
      setUsername(user.email.split("@")[0]);
    }
  }, [user, navigation]);

  const handleCreateProfile = async (skip = false) => {
    if (!skip) setIsLoading("create");
    else setIsLoading("skip");
    if (!user) return;

    const result = await createUserProfile({
      uid: user.uid,
      email: user.email,
      username: skip ? null : username,
      favoriteDrink: skip ? null : favDrink,
      country: skip ? null : country,
      profilePicture: skip ? null : profilePicture,
    });

    if (result) {
      setUser({ ...result }); ///Check this part
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result));
    }
    setIsLoading(false);
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
            Username (required):
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
              handleCreateProfile(false);
            }}
            buttonColor={theme.colors.ui.primary}
            textColor={theme.colors.text.inverse}
            loading={isLoading === "create"}
            disabled={username.length < 3}
          >
            Create Profile
          </FormActionButton>
        </Spacer>
        <Spacer position="top" size="large">
          <FormActionButton
            mode="outlined"
            onPress={() => {
              handleCreateProfile(true);
            }}
            textColor={theme.colors.ui.primary}
            loading={isLoading === "skip"}
          >
            I will do this later
          </FormActionButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};

export default CreateProfileScreen;
