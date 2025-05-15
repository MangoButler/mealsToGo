import styled from "styled-components/native";

export const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[3]};
  border-radius: ${(props) => props.theme.space[3]};
  z-index: 100;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
`;

export const CrudActionsContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: ${(props) => props.theme.space[4]} ${(props) => props.theme.space[5]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 0.5px;
  border-top-color: ${(props) => props.theme.colors.ui.primary};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const InputWrapper = styled.View`
  width: 100%;
  margin-top: ${(props) => props.theme.space[2]};
`;
