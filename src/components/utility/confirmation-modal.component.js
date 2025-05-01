import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Portal, Modal, Button } from "react-native-paper";
import { Text } from "../typography/text.component";
import { FormActionButton } from "../form/form-button.component";
import { Spacer } from "../spacer/spacer.component";
const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[3]};
  border-radius: ${(props) => props.theme.space[3]};
  z-index: 100;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.space[4]};
`;

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
`;

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
