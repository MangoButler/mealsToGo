import { calculateDistance, getUserLocation } from "./location.functions";

export const sortOptions = [
  { label: "Popular", value: "popular", icon: "star" },
  { label: "Newest", value: "newest", icon: "new-box" },
  { label: "Oldest", value: "oldest", icon: "history" },
  { label: "Rating", value: "rating", icon: "star-circle" },
  {
    label: "Alphabetical",
    value: "alphabetical",
    icon: "sort-alphabetical-variant",
  },
  { label: "Distance", value: "distance", icon: "map-marker-distance" },
];

export const sortPlaces = (places, sortOption, userLocation) => {
  if (!sortOption) return places;

  const sorted = [...places]; // avoid mutating original

  switch (sortOption) {
    case "popular":
      // Temporarily fallback to `createdAt` for popularity, update later when actual metric exists
      return sorted.sort(
        (a, b) => (b.hangoutStats?.total || 0) - (a.hangoutStats?.total || 0)
      );

    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

    case "alphabetical":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "rating":
      // Placeholder logic — assumes future `rating` field (e.g., a.rating = 4.5)
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    case "distance":
      if (!userLocation) return places;
      const { latitude: userLat, longitude: userLng } = userLocation;

      return sorted.sort((a, b) => {
        const distA = calculateDistance(
          userLat,
          userLng,
          a.location.location.lat,
          a.location.location.lng
        );
        const distB = calculateDistance(
          userLat,
          userLng,
          b.location.location.lat,
          b.location.location.lng
        );
        return distA - distB;
      });

    default:
      return places;
  }
};

export const getFilteredPlaces = async (places, filters) => {
  const { area, features, sort } = filters;

  const filtered = places.filter((place) => {
    const matchesArea = !area || place.area === area;

    const matchesFeatures =
      features.length === 0 ||
      features.every((feature) => place.features.includes(feature));

    return matchesArea && matchesFeatures;
  });

  let userLocation = null;
  if (sort === "distance") {
    try {
      userLocation = await getUserLocation();
    } catch (err) {
      console.warn("Unable to get user location for distance sort:", err);
    }
  }

  return sortPlaces(filtered, sort, userLocation);
};
