import styled from "styled-components/native";
import { Button, Card } from "react-native-paper";

export const Description = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
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

export const DetailCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.space[3]};

  align-content: space-between;
  /* border-radius: 12px; */
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const DetailCardCover = styled(Card.Cover)`
  object-fit: contain;
  border-radius: 0;
`;

export const RestaurantCardContent = styled(Card.Content)`
  margin-top: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const RestaurantCardActions = styled(Card.Actions)`
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const RestaurantActionsButton = styled(InfoButton)`
  border: none;
`;

export const RestaurantActionsButtonOutline = styled(InfoButton)`
  border-color: ${(props) => props.theme.colors.ui.primary};
`;

export const Info = styled.View`
  margin: ${(props) => props.theme.space[2]} 0;
`;
