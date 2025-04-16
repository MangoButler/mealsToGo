import React from "react";
import PlaceForm from "../../components/place-form.component";

const NewPlaceScreen = () => {
  return (
    <PlaceForm
      onSubmit={(newPlace) => {
        console.log(newPlace);
      }}
    />
  );
};

export default NewPlaceScreen;
