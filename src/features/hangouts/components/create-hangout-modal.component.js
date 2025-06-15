// import React, { useState } from "react";
// import LightModal from "../../../components/utility/light-modal.component";
// import { Text } from "../../../components/typography/text.component";

// import { FormButton } from "../../../components/utility/utility.styles";
// import DurationPicker from "../../../components/utility/duration-picker.component";

// const CreateHangoutModal = ({ visible, onDismiss, onConfirm = () => {} }) => {
//   const [start, setStart] = useState(new Date());
//   const [duration, setDuration] = useState(2);

//   const handleHangoutCreate = () => {
//     const startTime = new Date(start);
//     const start = new Date(startTime);
//     const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

//     //Call service function

//     onConfirm(); //this might be changed to calling on dissmiss
//     onDismiss();
//   };

//   return (
//     <LightModal visible={visible} onDismiss={onDismiss}>
//       <Text variant="labelCentered">
//         Let others know what time you plan to chill here:
//       </Text>
//       <DatePicker
//         date={start}
//         onDateChange={setStart}
//         mode="datetime" // you can separate date/time too
//         minimumDate={new Date()} // no past
//       />
//       <Text variant="hintCentered">How long will you be around for?:</Text>
//       <DurationPicker onSelect={setDuration} />
//       <FormButton onPress={handleHangoutCreate}>
//         Confirm Time
//       </FormButton>
//     </LightModal>
//   );
// };

// export default CreateHangoutModal;

import React, { useContext, useState } from "react";
import LightModal from "../../../components/utility/light-modal.component";
import { Text } from "../../../components/typography/text.component";
import { ButtonRow } from "../../../components/utility/utility.styles";
import DurationPicker from "../../../components/utility/duration-picker.component";

import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { en, registerTranslation } from "react-native-paper-dates";
import MenuButton from "../../../components/utility/menu-button.component";
import { FormActionButton } from "../../../components/form/form-button.component";
import styled, { useTheme } from "styled-components";
import {
  Footer,
  SelectorActionButton,
} from "../../../components/utility/checkbox-selector.component";
import { Alert, View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  createHangout,
  editHangout,
} from "../../../services/hangouts/hangouts.service";
import { timeout } from "../../../utils/transformations";
import { PlacesContext } from "../../../services/places/places.context";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import {
  getDistanceToPlace,
  getUserLocation,
  openInMaps,
} from "../../../utils/location.functions";

registerTranslation("en", en);

const ModalContainer = styled.View`
  display: flex;
  align-content: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[3]};
`;

const CreateHangoutModal = ({
  visible,
  onDismiss,
  onConfirm = () => {},
  place,
  mode = "create",
  hangout = null,
}) => {
  const placeId = place?.id;
  const { syncUserProfile } = useContext(AuthenticationContext);
  const [selectedDate, setSelectedDate] = useState(
    hangout ? new Date(hangout.startTime) : new Date()
  );
  const [time, setTime] = useState({
    hours: selectedDate.getHours(),
    minutes: selectedDate.getMinutes(),
  });
  const [duration, setDuration] = useState(2);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const theme = useTheme();
  const { triggerPlacesRefresh } = useContext(PlacesContext);
  const handleDateConfirm = ({ date }) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showInstantCheckIn, setShowInstantCheckIn] = useState(false);

  const handleTimeConfirm = ({ hours, minutes }) => {
    setTime({ hours, minutes });
    setShowTimePicker(false);
  };

  const handleHangoutCreate = async () => {
    setIsLoading(true);
    const startTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time.hours,
      time.minutes
    );

    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    const result = await createHangout(placeId, startTime, endTime);
    if (result) {
      onConfirm(); // Optional: can replace with just onDismiss()
      await syncUserProfile();
      await triggerPlacesRefresh();
      setIsLoading(false);
      onDismiss();
      Alert.alert("See you there!", result.message);
    }
    setIsLoading(false);
  };

  const handleHangoutEdit = async () => {
    setIsLoading(true);
    const startTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time.hours,
      time.minutes
    );

    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    const result = await editHangout(hangout?.hangoutId, startTime, endTime);
    if (result) {
      onConfirm(); // Optional: can replace with just onDismiss()
      await syncUserProfile();
      await triggerPlacesRefresh();
      setIsLoading(false);
      onDismiss();
      Alert.alert("Schedule Updated!", result.message);
    }
    setIsLoading(false);
  };

  const handleInstantCheckIn = async () => {
    //still updating
    setIsLoading(true);
    const distanceToPlace = await getDistanceToPlace(place);

    if (distanceToPlace > 2) {
      //   Alert.alert(
      //     "Too fare away",
      //     `Please move to ${place.title} and try again!`
      //   );
      Alert.alert(
        "Too far away to check in!",
        `Please move to ${place?.title}, and try again!`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Get Directions",
            onPress: () => {
              const { lat, lng } = place?.location.location || {};
              if (lat && lng) {
                openInMaps(lat, lng, place?.title);
              }
            },
          },
        ]
      );
      setIsLoading(false);
      onDismiss();
      return;
    }

    const startTime = new Date();

    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    const result = await createHangout(placeId, startTime, endTime, true);
    if (result) {
      onConfirm(); // Optional: can replace with just onDismiss()
      await syncUserProfile();
      await triggerPlacesRefresh();
      setIsLoading(false);
      onDismiss();
      Alert.alert("Enjoy your time!", result.message);
    }
    setIsLoading(false);
  };

  const isSubmitable = selectedDate && time && duration;
  const instantCheckInSubmittable = showInstantCheckIn && duration;

  return (
    <LightModal visible={visible} onDismiss={onDismiss}>
      {!showInstantCheckIn ? (
        <>
          <ModalContainer>
            <Text variant="labelCentered">
              {mode === "create" ? "Pick a Date" : "Edit Schedule"}
            </Text>
            <Text variant="hintCentered">
              Let others know what time you plan to be around!
            </Text>
            <Spacer position="horizontal" size="large">
              <MenuButton
                disabled={isLoading}
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
              >
                Select Date: {selectedDate.toDateString()}
              </MenuButton>
            </Spacer>
            <Spacer position="horizontal" size="large">
              <MenuButton
                disabled={isLoading}
                mode="outlined"
                onPress={() => setShowTimePicker(true)}
              >
                Select Time: {time.hours.toString().padStart(2, "0")}:
                {time.minutes.toString().padStart(2, "0")}
              </MenuButton>
            </Spacer>

            <DatePickerModal
              locale="en"
              mode="single"
              visible={showDatePicker}
              onDismiss={() => setShowDatePicker(false)}
              date={selectedDate}
              onConfirm={handleDateConfirm}
              validRange={{
                startDate: new Date(),
              }}
            />

            <TimePickerModal
              visible={showTimePicker}
              onDismiss={() => setShowTimePicker(false)}
              onConfirm={handleTimeConfirm}
              hours={time.hours}
              minutes={time.minutes}
            />
            <Spacer position="top" size="medium">
              <Spacer position="bottom" size="medium">
                <Text variant="hintCentered">
                  How long will you be around for?
                </Text>
              </Spacer>
              <Spacer position="horizontal" size="large">
                <DurationPicker
                  onChange={setDuration}
                  value={duration}
                  disabled={isLoading}
                />
              </Spacer>
            </Spacer>
            {mode === "create" && (
              <Spacer position="vertical" size="medium">
                <Spacer position="bottom" size="large">
                  <Text variant="labelCentered">Already here?</Text>
                </Spacer>
                <Spacer position="horizontal" size="large">
                  <Spacer position="horizontal" size="large">
                    <MenuButton
                      disabled={isLoading}
                      mode="outlined"
                      onPress={() => setShowInstantCheckIn(true)}
                    >
                      Check in Instantly
                    </MenuButton>
                  </Spacer>
                </Spacer>
              </Spacer>
            )}
          </ModalContainer>

          <Footer>
            <SelectorActionButton
              mode="outlined"
              onPress={onDismiss}
              textColor={theme.colors.ui.primary}
              disabled={isLoading}
            >
              Cancel
            </SelectorActionButton>
            <SelectorActionButton
              mode="outlined"
              textColor={
                isSubmitable
                  ? theme.colors.text.inverse
                  : theme.colors.ui.primary
              }
              buttonColor={
                isSubmitable ? theme.colors.ui.primary : "transparent"
              }
              disabled={!isSubmitable}
              loading={isLoading}
              onPress={
                mode === "edit" && hangout
                  ? handleHangoutEdit
                  : handleHangoutCreate
              }
            >
              Confirm
            </SelectorActionButton>
          </Footer>
        </>
      ) : (
        <>
          <ModalContainer>
            <Text variant="labelCentered">How long will you stay?</Text>

            <Spacer position="top" size="medium">
              <Spacer position="horizontal" size="large">
                <DurationPicker
                  onChange={setDuration}
                  value={duration}
                  disabled={isLoading}
                />
              </Spacer>
            </Spacer>
          </ModalContainer>

          <Footer>
            <SelectorActionButton
              mode="outlined"
              onPress={() => {
                setShowInstantCheckIn(false);
              }}
              textColor={theme.colors.ui.primary}
              disabled={isLoading}
            >
              Cancel
            </SelectorActionButton>
            <SelectorActionButton
              mode="outlined"
              textColor={
                isSubmitable
                  ? theme.colors.text.inverse
                  : theme.colors.ui.primary
              }
              buttonColor={
                isSubmitable ? theme.colors.ui.primary : "transparent"
              }
              disabled={!instantCheckInSubmittable}
              loading={isLoading}
              onPress={handleInstantCheckIn}
            >
              Confirm
            </SelectorActionButton>
          </Footer>
        </>
      )}
    </LightModal>
  );
};

export default CreateHangoutModal;
