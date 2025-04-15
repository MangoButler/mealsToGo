import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import styled, { useTheme } from "styled-components/native";
import FormButton from "../../../components/form/form-button.component";
import { Text } from "../../../components/typography/text.component";
import FormTextInput from "../../../components/form/form-text-input.component";
import ImageUpload from "../../../components/form/image-upload.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import FeaturesSelector from "../../../components/form/features-selector.component";
import AccordionList from "../../../components/utility/accordion-list.component";
import { ScrollView } from "react-native";
import LocationPicker from "../../../components/form/location-picker.component";

const { height } = Dimensions.get("window");

const Container = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[4]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const CreatePlaceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [location, setLocation] = useState(null);

  const theme = useTheme();

  const handleSubmit = () => {
    const newPlace = {
      title,
      description,
      image,
      features: selectedFeatures,
      location,
    };

    console.log("New Place:", newPlace);
    // You can add form validation and submission logic here
  };

  return (
    <ScrollView>
      <Container>
        <Spacer position="bottom" size="large">
          <Text variant={"label"} theme={theme}>
            Share Your favorite drinking spot!
          </Text>
        </Spacer>

        <FormTextInput
          value={title}
          label={"Title"}
          onChangeText={(text) => setTitle(text)}
        />

        <FormTextInput
          value={description}
          label="Description"
          multiline
          onChangeText={(text) => setDescription(text)}
        />

        <ImageUpload onImageUpload={(img) => setImage(img)} />

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

        <FormButton onPress={handleSubmit}>Submit</FormButton>
      </Container>
    </ScrollView>
  );
};

export default CreatePlaceForm;
