import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { Portal, Modal } from "react-native-paper";
import { Text } from "../typography/text.component";
import { FormActionButton } from "../form/form-button.component";
import { Spacer } from "../spacer/spacer.component";
import { ButtonRow, Backdrop, ModalContainer } from "./utility.styles";
import PasswordInput from "../../features/account/components/password-input.component";

const ConfirmationModal = ({
  visible,
  onConfirm,
  onDismiss,
  message = "This action cannot be undone",
  title = "Are you sure?",
  requiresPassword = false,
  passwordError = null,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleConfirm = async () => {
    setIsLoading(true);
    if (requiresPassword) {
      await onConfirm(password);
      setPassword("");
    } else {
      await onConfirm();
    }
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
              {title}
            </Text>
            <Spacer position="top" size="large">
              <Text theme={theme} variant="centeredInfo">
                {message}
              </Text>
            </Spacer>
            {requiresPassword && (
              <Spacer position="top" size="large">
                <PasswordInput
                  value={password}
                  label="Password"
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  error={passwordError}
                  disabled={isLoading}
                />
              </Spacer>
            )}
            <ButtonRow>
              <FormActionButton
                mode="outlined"
                onPress={onDismiss}
                textColor={theme.colors.ui.primary}
                disabled={isLoading}
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
