import React, { useContext, useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import Search from "../components/search.component";
import { PlacesContext } from "../../../services/places/places.context";
import { LocationContext } from "../../../services/location/location.context";
import RestaurantInfoCard from "../../restaurants/components/restaurant-info-card.component";
import { View, Text } from "react-native";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const MapScreen = ({ navigation }) => {
  const { places, isLoading, error } = useContext(PlacesContext);
  const { location } = useContext(LocationContext);

  const [latDelta, setLatDelta] = useState(0);
  const { viewport, lat, lng } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
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
              title={place.name}
              description={"Description here"}
              // image={place.photos[0]}
              coordinate={{ latitude: lat, longitude: lng }}
              onCalloutPress={() => navigation.navigate("Places")}
            />
          );
        })}
      </Map>
    </>
  );
};

export default MapScreen;
