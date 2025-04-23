import styled from "styled-components/native";
import { Button, Card } from "react-native-paper";

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.space[1]};
`;
export const Description = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.info};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const InfoContainer = styled.View`
  flex-shrink: 0.7;
`;
export const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const CategoryIconContainer = styled(IconContainer)`
  gap: ${(props) => props.theme.space[1]};
  flex-wrap: wrap;
`;

export const InfoButton = styled(Button)`
  border-radius: ${(props) => props.theme.space[2]};
  border-color: ${(props) => props.theme.colors.ui.primary};
`;

export const HighlightSmall = styled(Description)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.highlight};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const PlaceCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[3]};
  /* margin-top: ${(props) => props.theme.space[0]}; */

  align-content: space-between;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const PlaceCardCover = styled(Card.Cover)`
  object-fit: contain;
  border-radius: 12px 12px 0 0;
`;

export const PlaceCardContent = styled(Card.Content)`
  margin-top: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const PlaceCardActions = styled(Card.Actions)`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const PlaceActionsButton = styled(InfoButton)`
  border: none;
`;

export const PlaceActionsButtonOutline = styled(InfoButton)`
  border-color: ${(props) => props.theme.colors.ui.primary};
`;

export const Info = styled.View`
  margin: ${(props) => props.theme.space[2]} 0;
`;

// export const Row = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: ${(props) => props.theme.space[1]};
//   margin-bottom: ${(props) => props.theme.space[2]};
// `;
