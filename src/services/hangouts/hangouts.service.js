import { Alert } from "react-native";
import { getIdTokenFromFirebase } from "../auth/auth.service";
import { ACTIVE_HANGOUT_URL, HANGOUT_URL } from "../places/places-api-url";
import {
  formatDate,
  formatTime,
  isWithinTwoHours,
} from "../../utils/transformations";
import {
  calculateDistance,
  getDistanceToPlace,
  getUserLocation,
  openInMaps,
} from "../../utils/location.functions";

export const createHangout = async (
  placeId,
  startTime,
  endTime,
  instantCheckIn = false
) => {
  try {
    const token = await getIdTokenFromFirebase();

    const response = await fetch(HANGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        placeId,
        startTime,
        endTime,
        instantCheckIn,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        console.log(errorData);
        Alert.alert("Error", errorData.error);
        return;
      }
      throw new Error(errorData.error || "Failed to submit time");
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message: instantCheckIn
        ? `Thanks for joining, have a blast!`
        : `Successfully saved schedule, see you at ${formatDate(startTime)} at around ${formatTime(startTime)}`,
    };
  } catch (error) {
    console.error("Submission error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const checkInToHangout = async (hangout) => {
  if (hangout.status !== "PENDING" || !isWithinTwoHours(hangout.startTime)) {
    Alert.alert("Sorry cannot check in for this visit.");
    return null;
  }

  const distanceToPlace = await getDistanceToPlace(hangout.place);

  if (distanceToPlace > 1) {
    Alert.alert(
      "Too far away to check in!",
      `Please move to ${hangout.place?.title}, and try again!`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Get Directions",
          onPress: () => {
            const { lat, lng } = hangout.place?.location.location || {};
            if (lat && lng) {
              openInMaps(lat, lng, hangout.place?.title);
            }
          },
        },
      ]
    );

    return null;
  }

  try {
    const token = await getIdTokenFromFirebase();
    const updateURL = HANGOUT_URL + `?hangoutId=${hangout.id}`;
    const response = await fetch(updateURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        checkedIn: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        console.log(errorData);
        Alert.alert("Error", errorData.error);
        return null;
      }
      throw new Error(errorData.error || "Failed to check in, try again later");
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message:
        "Thanks for joining! Your visit (but not your name) is now visible to others! Go out and mingle with other CanAndGoers!",
    };
  } catch (error) {
    console.error("Error Checking in:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

/// finishingHangout
export const finishHangout = async (hangout) => {
  if (hangout.status !== "ACTIVE") {
    Alert.alert("Cannot finish a non-active schedule. Check in first.");
    return null;
  }

  try {
    const token = await getIdTokenFromFirebase();
    const updateURL = HANGOUT_URL + `?hangoutId=${hangout.id}`;
    const response = await fetch(updateURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        checkedIn: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        console.log(errorData);
        Alert.alert("Error", errorData.error);
        return null;
      }
      throw new Error(
        errorData.error || "Something went wrong, try again later"
      );
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message: `Your hangout has been finished, hope you enjoyed your time & see you soon!`,
    };
  } catch (error) {
    console.error("Error:", error);
    Alert.alert("Error", error.message);
    return null;
  }
};

export const editHangout = async (hangoutId, newStartTime, newEndTime) => {
  try {
    const token = await getIdTokenFromFirebase();
    const updateURL = HANGOUT_URL + `?hangoutId=${hangoutId}`;
    const response = await fetch(updateURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startTime: newStartTime,
        endTime: newEndTime,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        console.log(errorData);
        Alert.alert("Error", errorData.error);
        return null;
      }
      throw new Error(
        errorData.error || "Failed to edit scheduled time, try again later."
      );
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message: `Schedule updated successfully, see you at ${formatDate(newStartTime)} at around ${formatTime(newStartTime)}`,
    };
  } catch (error) {
    console.error("Error editing schedule:", error);
    Alert.alert("Error editing schedule:", error.message);
    return null;
  }
};

export const deleteHangout = async (hangoutId) => {
  try {
    const token = await getIdTokenFromFirebase();
    const deleteURL = HANGOUT_URL + `?hangoutId=${hangoutId}`;
    const response = await fetch(deleteURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        console.log(errorData);
        Alert.alert("Error", errorData.error);
        return null;
      }
      throw new Error(
        errorData.error || "Failed to cancel scheduled time, try again later."
      );
    }

    const data = await response.json();
    // Alert.alert("Success", "Place submitted successfully!");

    return {
      data,
      message: `Schedule cancelled successfully, hope to see you another time!`,
    };
  } catch (error) {
    console.error("Error cancelling schedule:", error);
    Alert.alert("Error cancelling schedule:", error.message);
    return null;
  }
};

export const getActiveUsersForPlace = async (placeId) => {
  try {
    const activeUsersUrl = `${ACTIVE_HANGOUT_URL}?placeId=${placeId}`;
    const response = await fetch(activeUsersUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch active users...try again!");
    }
    const activeUsers = await response.json();
    return activeUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    Alert.alert("An error occured.", error.message);
    return null;
  }
};
