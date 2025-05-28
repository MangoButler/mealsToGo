import * as Location from "expo-location";
import { Linking, Platform } from "react-native";

export const transformLocationToGeometry = (loc) => {
  const defaultCoordinateDelta = 0.0026979605829993147 / 2;
  const location = {
    lat: loc.coords.latitude,
    lng: loc.coords.longitude,
  };
  const viewport = {
    northeast: {
      lat: location.lat + defaultCoordinateDelta,
      lng: location.lng + defaultCoordinateDelta,
    },
    southwest: {
      lat: location.lat - defaultCoordinateDelta,
      lng: location.lng - defaultCoordinateDelta,
    },
  };
  const geometry = { location, viewport };

  return geometry;
};

export const getUserLocation = async () => {
  try {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
      return null;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    return { latitude, longitude };
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
};

export function getCityFromCoordinates(lat, lng) {
  // Rough bounding boxes
  const tokyoBounds = {
    north: 35.9,
    south: 35.5,
    east: 139.95,
    west: 139.55,
  };

  const jakartaBounds = {
    north: -5.1,
    south: -6.4,
    east: 107.0,
    west: 106.6,
  };

  if (
    lat >= tokyoBounds.south &&
    lat <= tokyoBounds.north &&
    lng >= tokyoBounds.west &&
    lng <= tokyoBounds.east
  ) {
    return "Tokyo";
  }

  if (
    lat >= jakartaBounds.south &&
    lat <= jakartaBounds.north &&
    lng >= jakartaBounds.west &&
    lng <= jakartaBounds.east
  ) {
    return "Jakarta";
  }

  return "Unknown";
}

export async function getCityFromUserLocation() {
  const { latitude, longitude } = await getUserLocation();
  const city = getCityFromCoordinates(latitude, longitude);

  return city;
}

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
};

export const openInMaps = (lat, lng, label = "Destination") => {
  const scheme = Platform.select({
    ios: `maps:0,0?q=${label}@${lat},${lng}`,
    android: `geo:0,0?q=${lat},${lng}(${label})`,
  });

  Linking.openURL(scheme).catch((err) =>
    console.error("An error occurred", err)
  );
};
