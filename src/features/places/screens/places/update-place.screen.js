import React from "react";
import PlaceForm from "../../components/place-form.component";
import { editPlace } from "../../../../services/places/places.service";

const UpdatePlaceScreen = ({ navigation, route }) => {
  const { place } = route.params;

  return (
    <PlaceForm
      place={place}
      onSubmit={editPlace}
      formTitle="Edit this location:"
      navigation={navigation}
    />
  );
};

export default UpdatePlaceScreen;
