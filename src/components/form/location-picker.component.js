import React, { useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";

import styled, { useTheme } from "styled-components/native";
import { Text } from "../typography/text.component";
import FormButton from "./form-button.component";
import { transformLocationToGeometry } from "../../utils/location.functions";
import { Spacer } from "../spacer/spacer.component";
import MiniMap from "../utility/mini-map.component";

const Container = styled(View)`
  margin: ${(props) => props.theme.space[2]};
`;

const LocationPicker = ({ onLocationSelected, preSelected }) => {
  const theme = useTheme();
  const [location, setLocation] = useState(preSelected || null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = async () => {
    try {
      setErrorMsg(null);
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location required.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const geometry = transformLocationToGeometry(loc);
      setLocation(geometry);
      onLocationSelected(geometry);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(
        "Something went wrong while fetching location. Please try again."
      );
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormButton
        onPress={getLocation}
        icon={location ? "map-marker-check" : "map-marker"}
        loading={isLoading}
      >
        Use Current Location
      </FormButton>
      {location && (
        <Spacer position="bottom" size="medium">
          <MiniMap geometry={location} />
          <Spacer position="top" size="medium">
            <Text variant="caption" theme={theme}>
              📍 Location: {location.location.lat.toFixed(4)},{" "}
              {location.location.lng.toFixed(4)}
            </Text>
          </Spacer>
        </Spacer>
      )}
      {errorMsg && (
        <Text variant="error" theme={theme}>
          {errorMsg}
        </Text>
      )}
    </Container>
  );
};

export default LocationPicker;
