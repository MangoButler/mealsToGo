import { View, Text } from "react-native";
import React from "react";
import ReviewForm from "../../components/review-form.component";
import { createReview } from "../../../../services/reviews/reviews.service";
import { returnToPlacesOverview } from "../../../../utils/places-navigation.functions";
const ReviewScreen = ({ route, navigation }) => {
  const { hangout } = route.params;

  const onGoBack = async () => {
    await returnToPlacesOverview(navigation, { refreshKey: Date.now() });
  };

  const onSubmit = async ({ rating, comment, imageUri }) => {
    try {
      const result = await createReview({
        rating,
        comment, // ← missing in your current version
        placeId: hangout.place.id,
        hangoutId: hangout.id,
        imageUri,
      });

      if (result?.data) {
        // Maybe add navigation or feedback here
        return result;
      } else {
        console.log("No Data Received");
        return null;
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      return null;
    }
  };

  return (
    <ReviewForm
      hangout={hangout}
      navigation={navigation}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
    />
  );
};

export default ReviewScreen;
