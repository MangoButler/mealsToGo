import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Portal, Modal, Button } from "react-native-paper";
import { Text } from "../typography/text.component";
import { FormActionButton } from "../form/form-button.component";
import { Spacer } from "../spacer/spacer.component";
import { ButtonRow, Backdrop, ModalContainer } from "./utility.styles";

const ConfirmationModal = ({ visible, onConfirm, onDismiss }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ flex: 1 }}
      >
        <Backdrop>
          <ModalContainer>
            <Text theme={theme} variant="heading">
              Are you sure?
            </Text>
            <Spacer position="top" size="large">
              <Text theme={theme} variant="centeredInfo">
                This action cannot be undone
              </Text>
            </Spacer>
            <ButtonRow>
              <FormActionButton
                mode="outlined"
                onPress={onDismiss}
                textColor={theme.colors.ui.primary}
              >
                Cancel
              </FormActionButton>
              <FormActionButton
                mode="contained"
                onPress={handleConfirm}
                buttonColor={theme.colors.ui.error}
                textColor={theme.colors.text.inverse}
                loading={isLoading}
              >
                Confirm
              </FormActionButton>
            </ButtonRow>
          </ModalContainer>
        </Backdrop>
      </Modal>
    </Portal>
  );
};

export default ConfirmationModal;
