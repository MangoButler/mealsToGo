import React from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { TouchableWithoutFeedback, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
  border-radius: ${(props) => props.theme.sizes[2]};
`;

const MapOverlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  display: flex;
  align-items: center;
  z-index: 100;
`;

const OverlayText = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const MapContainer = styled.View`
  height: ${screenHeight * 0.33}px;
  width: 100%;
`;

const MiniMap = ({ geometry }) => {
  const [latDelta, setLatDelta] = useState(0);
  const { viewport, location } = geometry;
  const [mapInteractive, setMapInteractive] = useState(false);

  const handleMapTap = () => {
    setMapInteractive(true);
  };

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [viewport, geometry]);

  return (
    <MapContainer>
      {!mapInteractive && (
        <TouchableWithoutFeedback onPress={handleMapTap}>
          <MapOverlay>
            <OverlayText>Tap to interact</OverlayText>
          </MapOverlay>
        </TouchableWithoutFeedback>
      )}

      <Map
        scrollEnabled={mapInteractive}
        zoomEnabled={mapInteractive}
        rotateEnabled={mapInteractive}
        pitchEnabled={mapInteractive}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.lng }}
        />
      </Map>
    </MapContainer>
  );
};

export default MiniMap;
