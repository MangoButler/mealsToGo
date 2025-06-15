import { Dimensions, TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  PlaceCardContent,
  PlaceCardCover,
} from "../../features/places/components/places-info-card.styles";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";
import { getWalkingTimeInMinutes } from "../../utils/station.functions";
import { Card } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

const HighlightPlace = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-right: ${(props) => props.theme.space[2]};
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.space[1]};
  width: ${screenWidth * 0.7}px;
`;

const HighlightItem = ({ item, onCardPress, renderActions = null }) => {
  const theme = useTheme();

  return (
    <HighlightPlace>
      <TouchableOpacity onPress={() => onCardPress(item)}>
        <PlaceCardCover src={item.imageUrl} />
      </TouchableOpacity>
      <PlaceCardContent>
        <Spacer size={"small"} position={"bottom"}>
          <Text theme={theme} variant={"label"}>
            {item.title}
          </Text>
        </Spacer>
        <Spacer size="small" position="bottom">
          <Text theme={theme} variant={"hint"}>
            {item.area}, {item.city}
          </Text>
        </Spacer>

        <Text theme={theme} variant={"caption"}>
          {item.nearbyStations && item.nearbyStations.length
            ? `${item.nearbyStations[0].name} around ${getWalkingTimeInMinutes(item.nearbyStations[0].distance)} min`
            : "More than 10 min to closest station."}
        </Text>

        {renderActions && renderActions(item)}
      </PlaceCardContent>
    </HighlightPlace>
  );
};

export default HighlightItem;
