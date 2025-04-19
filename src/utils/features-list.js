export const FEATURES = [
  { label: "Conbini", value: "conbini", icon: "store-24-hour" },
  {
    label: "Supermarket",
    value: "supermarket",
    icon: "store",
  },
  { label: "Toilet", value: "toilet", icon: "toilet" },
  { label: "Table", value: "table", icon: "table-picnic" },
  { label: "Benches", value: "benches", icon: "seat" },
  { label: "Take-Away", value: "take-away", icon: "food-takeout-box" },
  { label: "Raincover", value: "raincover", icon: "weather-rainy" },
  { label: "Sakura spot", value: "sakura-spot", icon: "flower" },
];

export const getFeaturesObjects = (featuresArray) => {
  const featureObjects = FEATURES.filter((feature) =>
    featuresArray.includes(feature.value)
  );

  return featureObjects;
};
