export const returnToPlacesOverview = async (navigation, options = {}) => {
  const { screen = "Overview", refreshKey = null } = options;

  const params = refreshKey ? { refreshKey } : undefined;

  await navigation.reset({
    index: 0,
    routes: [{ name: screen, params }],
  });
};

export const goBack = (navigation) => {
  navigation.goBack();
};
