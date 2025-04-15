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

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      //   const coords = {
      //     lat: loc.coords.latitude,
      //     lng: loc.coords.longitude,
      //   };
      const geometry = transformLocationToGeometry(loc);
      setLocation(geometry);
      onLocationSelected(geometry); // pass it to parent
    } catch (error) {
      setErrorMsg("Something went wrong while fetching location");
      console.error(error);
    }
  };

  return (
    <Container>
      <FormButton
        onPress={getLocation}
        icon={location ? "map-marker-check" : "map-marker"}
      >
        Use Current Location
      </FormButton>
      {location && (
        <Spacer position="bottom" size="medium">
          <MiniMap geometry={location} />
          <Spacer position="top" size="small">
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
