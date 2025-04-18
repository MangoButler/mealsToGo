import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import styled, { useTheme } from "styled-components/native";

import FormButton from "../../../components/form/form-button.component";
import { Text } from "../../../components/typography/text.component";
import FormTextInput from "../../../components/form/form-text-input.component";
import ImageUpload from "../../../components/form/image-upload.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import FeaturesSelector from "../../../components/form/features-selector.component";
import AccordionList from "../../../components/utility/accordion-list.component";
import LocationPicker from "../../../components/form/location-picker.component";
import { validateFormTextInput } from "../../../utils/validation";
import { returnToPlacesOverview } from "../../../utils/places-navigation.functions";
const Container = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[4]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const PlaceForm = ({ place = null, onSubmit, navigation }) => {
  const [title, setTitle] = useState(place ? place.title : "");
  const [description, setDescription] = useState(
    place ? place.description : "Another wonderful spot, overlooked by most!"
  );
  const [image, setImage] = useState(place ? place.image : null);
  const [selectedFeatures, setSelectedFeatures] = useState(
    place ? place.features : []
  );
  const [location, setLocation] = useState(place ? place.location : null);

  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const theme = useTheme();

  const isSubmitable =
    title && image && location && !titleError && !descriptionError;

  const handleSubmit = () => {
    const titleErr = validateFormTextInput("Title", title);
    const descriptionErr = description
      ? validateFormTextInput("Description", description)
      : null;

    setTitleError(titleErr);
    setDescriptionError(descriptionErr);

    if (titleErr || descriptionErr) {
      return;
    }
    setFormLoading(true);
    const newPlace = {
      title,
      description,
      imageUrl: image,
      features: selectedFeatures,
      location,
    };
    const result = onSubmit(newPlace);
    setFormLoading(false);
    if (result) {
      returnToPlacesOverview(navigation);
    }
  };

  return (
    <ScrollView>
      <Container>
        <Spacer position="bottom" size="large">
          <Text variant={"label"} theme={theme}>
            Share Your Favorite Drinking Spot!
          </Text>
        </Spacer>

        <FormTextInput
          value={title}
          label="Title"
          onChangeText={(text) => {
            setTitle(text);
            if (titleError) setTitleError(null);
          }}
          error={titleError}
        />

        <ImageUpload onImageUploadSuccess={(img) => setImage(img)} />

        <Spacer position="bottom" size="large">
          <AccordionList
            title="Select Features"
            icon={selectedFeatures.length ? "check-circle-outline" : "details"}
          >
            <FeaturesSelector
              onSelectionChange={(features) => setSelectedFeatures(features)}
              preSelected={selectedFeatures}
            />
          </AccordionList>

          <AccordionList
            title="Set Location"
            icon={location ? "map-check-outline" : "map-outline"}
          >
            <LocationPicker
              onLocationSelected={(location) => setLocation(location)}
              preSelected={location}
            />
          </AccordionList>
        </Spacer>

        <FormTextInput
          value={description}
          label="Description (optional)"
          multiline
          onChangeText={(text) => {
            setDescription(text);
            if (descriptionError) setDescriptionError(null);
          }}
          error={descriptionError}
        />
        <Spacer position="top" size="medium">
          <FormButton
            loading={formLoading}
            onPress={handleSubmit}
            disabled={!isSubmitable}
          >
            Submit
          </FormButton>
        </Spacer>
      </Container>
    </ScrollView>
  );
};

export default PlaceForm;
