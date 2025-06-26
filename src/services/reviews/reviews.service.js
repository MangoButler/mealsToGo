import { Alert } from "react-native";
import { uploadImage } from "../../utils/cloudinary-functions";
import { getIdTokenFromFirebase } from "../auth/auth.service";
import { REVIEW_UPLOAD_PRESET, REVIEW_URL } from "../places/places-api-url";

export const fetchReviewsByPlaceId = async (placeId) => {
  const fetchUrl = `${REVIEW_URL}?placeId=${encodeURIComponent(placeId)}`;
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    if (response.status === 400) {
      return null;
    }
    const errorData = await response.json();
    throw (
      new Error(errorData.error) ||
      "Something went wrong, please relod the application"
    );
  }
  const reviews = await response.json();

  return reviews;
};

export const createReview = async ({
  rating,
  placeId,
  comment,
  hangoutId,
  imageUri,
}) => {
  try {
    const token = await getIdTokenFromFirebase();

    let secureUrl = null;
    if (imageUri) {
      secureUrl = await uploadImage(imageUri, REVIEW_UPLOAD_PRESET);
    }

    const requestBody = {
      rating,
      placeId,
      hangoutId,
      ...(comment ? { comment } : {}),
      ...(secureUrl ? { imageUrl: secureUrl } : {}),
    };

    const response = await fetch(REVIEW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData?.error || "Something went wrong";

      if (response.status === 403) {
        Alert.alert("Unauthorized", message);
      } else if (response.status === 400) {
        Alert.alert("Validation Error", message);
      } else {
        Alert.alert("Error", message);
      }
      return;
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message: "Thank you for sharing your opinion!",
    };
  } catch (error) {
    console.error("Submission error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const updateReview = async ({ reviewId, rating, comment, imageUri }) => {
  try {
    const token = await getIdTokenFromFirebase();

    let secureUrl = null;
    if (imageUri) {
      secureUrl = await uploadImage(imageUri, REVIEW_UPLOAD_PRESET);
    }

    const requestBody = {
      rating,
      ...(comment ? { comment } : {}),
      ...(secureUrl ? { imageUrl: secureUrl } : {}),
    };

    const response = await fetch(REVIEW_URL + `?reviewId=${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData?.error || "Something went wrong";

      if (response.status === 403) {
        Alert.alert("Unauthorized", message);
      } else if (response.status === 400) {
        Alert.alert("Validation Error", message);
      } else {
        Alert.alert("Error", message);
      }
      return;
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message: "Review updated successfully!",
    };
  } catch (error) {
    console.error("Update error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const token = await getIdTokenFromFirebase();
    const deleteURL = `${REVIEW_URL}?reviewId=${reviewId}`;

    const response = await fetch(deleteURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || "Failed to delete review, try again later.",
        status: response.status,
      };
    }

    return {
      success: true,
      data,
      message: "Review deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting Review:", error);
    return {
      success: false,
      error: "Network error. Please try again later.",
    };
  }
};

// export const deleteReview = async (reviewId) => {
//   try {
//     const token = await getIdTokenFromFirebase();
//     const deleteURL = REVIEW_URL + `?reviewId=${reviewId}`;
//     const response = await fetch(deleteURL, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       if (response.status === 403) {
//         console.log(errorData);
//         Alert.alert("Error", errorData.error);
//         return null;
//       }
//       throw new Error(
//         errorData.error || "Failed to delete review, try again later."
//       );
//     }

//     const data = await response.json();
//     console.log(data);
//     return {
//       data,
//       message: `Review deleted successfully!`,
//     };
//   } catch (error) {
//     console.error("Error deleting Review:", error);
//     Alert.alert("Error deleting review, try again later.");
//     return null;
//   }
// };
