import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import MenuButton from "./menu-button.component";
// const Container = styled.View`
//   width: 100%;
//   align-items: center;
//   justify-content: center;
// `;
// const ButtonLikeInput = styled.View`
//   padding: 12px;
//   border-width: 0.7px;
//   border-color: ${({ theme }) => theme.colors.text.secondary};
//   border-radius: ${(props) => props.theme.space[2]};
//   background-color: ${({ theme }) => theme.colors.bg.secondary};
//   justify-content: center;
//   align-items: center;
//   width: 50%;
// `;

// const ButtonText = styled(Text)`
//   font-size: ${({ theme }) => theme.fontSizes.caption};
//   color: ${({ theme }) => theme.colors.text.secondary};
//   text-align: center;
// `;

export const DropdownAnchor = ({
  onPress,
  label,
  children,
  disabled = false,
  ...props
}) => (
  <MenuButton
    mode="outlined"
    onPress={() => setShowTimePicker(true)}
    disabled={disabled}
    {...props}
  >
    {label || children || "Select"}
  </MenuButton>
);
