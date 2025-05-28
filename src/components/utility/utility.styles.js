import { Button } from "react-native-paper";
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
  margin: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
`;

export const CrudActionsContainer = styled.View`
  position: absolute; /*  changed */
  bottom: 0;
  right: 0;
  left: 0;
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[4]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 0.5px;
  border-top-color: ${(props) => props.theme.colors.ui.primary};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const CrudActionButton = styled(Button).attrs({
  contentStyle: {
    flex: 1,
    justifyContent: "center",
  },
})`
  flex: 1;
  margin: 0 ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.space[2]};
`;

export const CrudActionContainerScrollView = styled.ScrollView.attrs(
  (props) => ({
    contentContainerStyle: {
      paddingBottom: 120, // adjust to be at least the height of CrudActionsContainer + some spacing
    },
  })
)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const InputWrapper = styled.View`
  width: 100%;
  margin-top: ${(props) => props.theme.space[2]};
`;

export const MaxSpacer = styled.View`
  height: 100px;
`;
