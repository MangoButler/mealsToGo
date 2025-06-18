import React, { useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../typography/text.component";
import { Card } from "react-native-paper";
import { Spacer } from "../spacer/spacer.component";
import {
  PlaceCardContent,
  PlaceCardCover,
} from "../../features/places/components/places-info-card.styles";
import { getWalkingTimeInMinutes } from "../../utils/station.functions";
import { theme } from "../../infrastructure/theme";
import { formatDate, formatTime } from "../../utils/transformations";
import LoadingSpinner from "../utility/loading-spinner.component";
import {
  Footer,
  SelectorActionButton,
} from "../utility/checkbox-selector.component";
import HighlightItem from "./highlight-item.component";

const screenWidth = Dimensions.get("window").width;

const HighlightScroll = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingRight: theme.space[2],
  },
}))``;

const Container = styled.View`
  padding: ${(props) => props.theme.space[2]};
  padding-left: ${(props) => props.theme.space[3]};
`;

// const HighlightItem = styled(Card)`
//   background-color: ${(props) => props.theme.colors.bg.primary};
//   margin-right: ${(props) => props.theme.space[2]};
//   border-radius: 12px;
//   margin-bottom: ${(props) => props.theme.space[1]};
//   width: ${screenWidth * 0.7}px;
// `;

const HighlightContainer = styled.View`
  gap: ${(props) => props.theme.space[2]};
  flex-direction: row;
`;

const AnimatedRow = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  /* padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[0]}; */
`;

const NoHighlight = styled(Text)`
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const HighlightBar = ({
  items = [],
  visible,
  panelType = "",
  onCardPress,
  renderActions,
}) => {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(1)).current;

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
          <HighlightScroll>
            <HighlightContainer>
              {items.map((item) => (
                // <HighlightItem
                //   key={
                //     panelType === "upcoming" && item.startTime
                //       ? item.id + item.startTime
                //       : item.id + panelType
                //   }
                // >
                //   <TouchableOpacity onPress={() => onCardPress(item)}>
                //     <PlaceCardCover src={item.imageUrl} />
                //   </TouchableOpacity>
                //   <PlaceCardContent>
                //     <Spacer size={"small"} position={"bottom"}>
                //       <Text theme={theme} variant={"label"}>
                //         {item.title}
                //       </Text>
                //     </Spacer>
                //     <Spacer size="small" position="bottom">
                //       <Text theme={theme} variant={"hint"}>
                //         {item.area}, {item.city}
                //       </Text>
                //     </Spacer>

                //     <Text theme={theme} variant={"caption"}>
                //       {item.nearbyStations && item.nearbyStations.length
                //         ? `${item.nearbyStations[0].name} around ${getWalkingTimeInMinutes(item.nearbyStations[0].distance)} min`
                //         : "More than 10 min to closest station."}
                //     </Text>

                //     {renderActions && renderActions(item)}
                //   </PlaceCardContent>
                // </HighlightItem>
                <HighlightItem
                  item={item}
                  renderActions={renderActions}
                  onCardPress={onCardPress}
                  panelType={panelType}
                  key={
                    panelType === "upcoming" && item.startTime
                      ? item.id + item.startTime
                      : item.id + panelType
                  }
                />
              ))}
            </HighlightContainer>
          </HighlightScroll>
        ) : (
          <NoHighlight theme={theme} variant="captionCentered">
            {panelType === "favorites"
              ? "Add Favorites to display them here."
              : "Nothing here at the moment..."}
          </NoHighlight>
        )}
      </AnimatedRow>
    </Container>
  );
};

export default HighlightBar;

// <Footer>
//   <SelectorActionButton
//     mode="contained"
//     onPress={() => {}}
//     buttonColor={theme.colors.ui.error}
//     textColor={theme.colors.text.inverse}
//     // disabled={isLoading}
//   >
//     Cancel
//   </SelectorActionButton>
//   <SelectorActionButton
//     mode="contained"
//     textColor={theme.colors.text.inverse}
//     buttonColor={theme.colors.brand.muted}
//     // disabled={!isSubmitable}
//     // loading={isLoading}
//     onPress={() => {}}
//   >
//     Edit
//   </SelectorActionButton>
// </Footer>;
