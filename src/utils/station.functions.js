export function getWalkingTimeInMinutes(distanceMeters) {
  const metersPerMinute = 5000 / 60;
  const time = distanceMeters / metersPerMinute;
  return Math.ceil(time);
}

export function getIcons(array, icon) {
  return array.map((item) => {
    return { label: item, icon: icon };
  });
}

export function formatStations(array, icon) {
  return array.map((station) => {
    return {
      label: `${station.name} (${getWalkingTimeInMinutes(station.distance)} min)`,
      icon: icon,
    };
  });
}
