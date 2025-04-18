import React from "react";
import PlaceForm from "../../components/place-form.component";
import { submitPlace } from "../../../../services/places/places.service";

const NewPlaceScreen = ({ navigation }) => {
  return <PlaceForm onSubmit={submitPlace} navigation={navigation} />;
};

export default NewPlaceScreen;
