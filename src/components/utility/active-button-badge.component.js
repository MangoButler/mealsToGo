import styled, { useTheme } from "styled-components/native";
import { Badge, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const bigScreen = screenWidth < 400 ? false : true;

const ActiveBadgeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.color ? props.color : props.theme.colors.ui.success};
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 999px;
  align-self: flex-start;
`;

const BadgeText = styled(Text)`
  color: ${(props) =>
    props.textColor ? props.textColor : props.theme.colors.text.inverse};
  font-weight: bold;
  margin-left: ${(props) => props.theme.space[1]};
  font-size: ${bigScreen
    ? (props) => props.theme.fontSizes.button
    : (props) => props.theme.fontSizes.caption};
  text-align: center;
`;

export const ActiveBadge = ({
  activeCount,
  message = "active",
  color,
  textColor,
  icon = "account-group",
}) => {
  const theme = useTheme();
  if (!activeCount) return null;

  return (
    <ActiveBadgeContainer color={color}>
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={theme.colors.text.inverse}
      />
      <BadgeText textColor={textColor}>
        {activeCount > 100 ? "100+" : activeCount} {message}
      </BadgeText>
    </ActiveBadgeContainer>
  );
};
