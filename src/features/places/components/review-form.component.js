import React, { useContext, useState } from "react";
import {
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
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
import { PlacesContext } from "../../../services/places/places.context";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import { FormContainer } from "./place-form.component";
import { createReview } from "../../../services/reviews/reviews.service";
import StarRatingInput from "../../../components/form/star-rating-input.component";
// const FormContainer = styled(View)`
//   /* flex: 1; */
//   padding: ${(props) => props.theme.space[4]};
//   background-color: ${(props) => props.theme.colors.bg.secondary};
// `;

const ReviewForm = ({
  hangout = null,
  review = null,
  onSubmit,
  navigation,
  formTitle = "Leave a Review?",
  onGoBack,
}) => {
  const [rating, setRating] = useState(review ? review.rating : 3);
  const [comment, setComment] = useState(review ? review.comment : "");
  const [image, setImage] = useState(
    review && review.imageUrl ? review.imageUrl : null
  );
  const [formLoading, setFormLoading] = useState(false);
  const theme = useTheme();

  //   const [descriptionError, setDescriptionError] = useState(null);
  //   const { user, syncUserProfile } = useContext(AuthenticationContext);
  const { triggerPlacesRefresh } = useContext(PlacesContext);

  const handleSubmit = async () => {
    setFormLoading(true);

    const result = await onSubmit({
      rating,
      comment,
      imageUri: image,
    });

    setFormLoading(false);
    if (result) {
      triggerPlacesRefresh();
      Alert.alert("Success", result.message);
      // await returnToPlacesOverview(navigation);

      await onGoBack();
    }
  };

  // const onGoBack = async () => {
  //   await returnToPlacesOverview(navigation);
  // };
  const placeImage = hangout
    ? hangout.place?.imageUrl
    : review
      ? review.place?.imageUrl
      : "";

  const placeTitle = hangout
    ? hangout.place?.title
    : review
      ? review.place?.title
      : "";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <FormContainer>
          <Spacer position="bottom" size="large">
            <Text variant={"heading"}>{formTitle}</Text>
          </Spacer>
          {placeImage && (
            <Image
              source={{ uri: placeImage }}
              style={{ width: "100%", height: 200, borderRadius: 12 }}
            />
          )}

          <Spacer position="vertical" size="medium" />

          <Text variant="labelCentered">How would you rate this place?</Text>

          <StarRatingInput rating={rating} onChange={setRating} />
          <Spacer position="top" size="medium" />
          <Text variant="hintCentered">
            Let us know your thoughts on "{placeTitle}", we appreciate your
            comment!
          </Text>
          <FormTextInput
            value={comment}
            label="Leave a comment (optional)"
            multiline
            onChangeText={setComment}
          />
          <Spacer position="vertical" size="large">
            <Text variant="hintCentered">
              Got a Picture to share? (optional)
            </Text>
            <ImageUpload
              imageUri={image}
              onImageUploadSuccess={(img) => setImage(img)}
            />
          </Spacer>

          <FormButton
            loading={formLoading}
            onPress={handleSubmit}
            mode="contained"
            disabled={!rating}
          >
            {!!review ? "Update Review" : "Submit Review"}
          </FormButton>
          <Spacer position="bottom" size="medium" />

          <FormButton
            buttonColor={theme.colors.bg.secondary}
            textColor={theme.colors.text.secondary}
            onPress={onGoBack}
            mode="outlined"
            disabled={formLoading}
          >
            {!!review ? "Cancel" : "Skip"}
          </FormButton>
        </FormContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewForm;
