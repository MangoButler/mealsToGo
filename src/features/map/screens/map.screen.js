import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";
import Search from "../components/search.component";
import { PlacesContext } from "../../../services/places/places.context";
import { LocationContext } from "../../../services/location/location.context";
import PlaceInfoCard from "../../places/components/places-info-card.component";
import { Modal } from "react-native";
import NotFound from "../../../components/utility/not-found.component";
import LoadingSpinner from "../../../components/utility/loading-spinner.component";
import ErrorScreen from "../../../components/utility/error-screen.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const ModalOverlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalContentWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
  max-height: 70%;
  width: 100%;
`;

const MapScreen = ({ navigation }) => {
  const { places, isLoading } = useContext(PlacesContext);
  const {
    location,
    isLoading: locationLoading,
    error: locationError,
    keyword,
  } = useContext(LocationContext);

  const [latDelta, setLatDelta] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { viewport, lat, lng } = location || {
    viewport: null,
    lat: null,
    lng: null,
  };

  useEffect(() => {
    if (viewport) {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;

      setLatDelta(northeastLat - southwestLat);
    }
  }, [location, viewport, keyword]);

  if (isLoading || locationLoading) {
    return (
      <>
        <Search />
        <LoadingSpinner />
      </>
    );
  }
  if (locationError || !viewport) {
    return (
      <>
        <Search />
        {locationError ? <ErrorScreen error={locationError} /> : <NotFound />}
      </>
    );
  }
  return (
    <>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalOverlay
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
          />
          <ModalContentWrapper>
            {selectedPlace && (
              <PlaceInfoCard
                place={selectedPlace}
                onDetailClick={() => {
                  setModalVisible(false);
                  navigation.navigate("Places", {
                    screen: "PlaceDetail",
                    params: { item: selectedPlace },
                  });
                }}
              />
            )}
          </ModalContentWrapper>
        </ModalContainer>
      </Modal>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {places.map((place) => {
          const { lat, lng } = place.location.location;
          return (
            <Marker
              key={`${place.id}-${place.title}`}
              onPress={() => {
                setSelectedPlace(place);
                setModalVisible(true);
              }}
              coordinate={{ latitude: lat, longitude: lng }}
            />
          );
        })}
      </Map>
    </>
  );
};

export default MapScreen;
