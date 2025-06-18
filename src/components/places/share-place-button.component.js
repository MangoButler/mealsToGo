import { Alert, Share } from "react-native";
import React from "react";
import { InfoButton } from "../../features/places/components/places-info-card.styles";
import { renderError } from "../../utils/validation";
import { getShareSentence } from "../../utils/transformations";
import { useTheme } from "styled-components/native";

const SharePlaceButton = ({ place, current = true }) => {
  const theme = useTheme();
  const onShare = async () => {
    const message = getShareSentence(place, current);
    try {
      await Share.share({
        message: message,
      });
    } catch (error) {
      const errorMessage = renderError(error);
      Alert.alert("Failed to Share", errorMessage);
    }
  };
  return (
    <InfoButton
      textColor={theme.colors.ui.primary}
      mode="outlined"
      compact
      icon="share"
      onPress={onShare}
    >
      Invite Others
    </InfoButton>
  );
};

export default SharePlaceButton;

// const { lat, lng } = place.location.location;
// const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
// const scheduleDate = current ? null : formatDate(new Date(place.startTime));
// const scheduleTime = current ? null : formatTime(new Date(place.startTime));

// const message = current
//   ? `Join me at ${place.title} for some fun! Get directions: ${mapsUrl}. Shared via: Cans&Go.co`
//   : `Planning to visit ${place.title} on ${scheduleDate} at ${scheduleTime}, wanna join? Get Directions: ${mapsUrl}. Shared via: Cans&Go.co`;
