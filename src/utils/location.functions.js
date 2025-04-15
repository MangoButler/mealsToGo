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
