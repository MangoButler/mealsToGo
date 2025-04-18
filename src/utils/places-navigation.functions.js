export const returnToPlacesOverview = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Overview" }],
  });
};
