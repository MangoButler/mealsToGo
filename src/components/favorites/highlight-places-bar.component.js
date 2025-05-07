import React, { useRef, useEffect } from "react";
import { Animated, ScrollView, TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../typography/text.component";
import { Card } from "react-native-paper";
import { Spacer } from "../spacer/spacer.component";
import {
  PlaceCardContent,
  PlaceCardCover,
} from "../../features/places/components/places-info-card.styles";
import { getWalkingTimeInMinutes } from "../../utils/station.functions";

const Container = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const HighlightItem = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-right: ${(props) => props.theme.space[2]};
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.space[1]};
`;

const AnimatedRow = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[0]};
`;

const NoHighlight = styled(Text)`
  justify-self: center;
  flex: 1;
`;

const HighlightBar = ({ items, visible, panelType = "", navigation }) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(1)).current;
  const onCardPress = (item) => {
    navigation.navigate("PlaceDetail", { item });
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <Container>
      <AnimatedRow
        style={{
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100], // 100px slide from bottom
              }),
            },
          ],
          opacity: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        {items.length ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map((item) => (
              <HighlightItem key={item.id}>
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
                </PlaceCardContent>
              </HighlightItem>
            ))}
          </ScrollView>
        ) : (
          <NoHighlight theme={theme} variant="captionCentered">
            {panelType === "favorites"
              ? "Add Favorites to display them here."
              : "Nothing trending at the moment, come back later."}
          </NoHighlight>
        )}
      </AnimatedRow>
    </Container>
  );
};

export default HighlightBar;
