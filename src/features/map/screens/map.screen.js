import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import styled, { useTheme } from "styled-components/native";
import Search from "../components/search.component";
import { PlacesContext } from "../../../services/places/places.context";
import { LocationContext } from "../../../services/location/location.context";
import RestaurantInfoCard from "../../restaurants/components/restaurant-info-card.component";
import { Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Modal, View, TouchableOpacity } from "react-native";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const MapScreen = ({ navigation }) => {
  const theme = useTheme();
  const { places, isLoading, error } = useContext(PlacesContext);
  const { location } = useContext(LocationContext);

  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location;

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
          />
          <View
            style={{
              // backgroundColor: "#fff",
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: "70%",
              marginBottom: 20,
            }}
          >
            {selectedPlace && (
              <RestaurantInfoCard
                restaurant={selectedPlace}
                onDetailClick={() => {
                  setModalVisible(false);
                  navigation.navigate("Places", { place: selectedPlace });
                }}
              />
            )}
          </View>
        </View>
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
          const { lat, lng } = place.geometry.location;
          return (
            <Marker
              key={`${place.locationId}-${place.name}`}
              onPress={() => {
                setSelectedPlace(place);
                setModalVisible(true);
              }}
              coordinate={{ latitude: lat, longitude: lng }}
              // title={place.name}
              // description={"Description here"}
              // onCalloutPress={() => navigation.navigate("Places")}
            />
          );
        })}
      </Map>
    </>
  );
};

export default MapScreen;
