export const returnToPlacesOverview = async (navigation) => {
  await navigation.reset({
    index: 0,
    routes: [{ name: "Overview" }],
  });
};

export const goBack = (navigation) => {
  navigation.goBack();
};
