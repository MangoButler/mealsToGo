import { View, Text } from "react-native";
import React from "react";
import ReviewForm from "../../components/review-form.component";
import {
  createReview,
  updateReview,
} from "../../../../services/reviews/reviews.service";
const UpdateReviewScreen = ({ route, navigation }) => {
  const { review } = route.params;

  const onSubmit = async ({ rating, comment, imageUri }) => {
    try {
      const result = await updateReview({
        reviewId: review.id,
        rating,
        comment,
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

  const onGoBack = async () => {
    await navigation.reset({
      index: 0,
      routes: [
        {
          name: "Profile",
          params: {
            screen: "ProfileScreen",
            params: { refreshKey: Date.now() }, // forces re-render / hook update
          },
        },
      ],
    });
  };

  return (
    <ReviewForm
      review={review}
      navigation={navigation}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
      formTitle="Update Review"
    />
  );
};

export default UpdateReviewScreen;
