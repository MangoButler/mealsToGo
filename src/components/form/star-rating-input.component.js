import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const MAX_STARS = 5;

// Styled Components
const StarContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: ${(props) => props.theme.space[3]} 0;
`;

const StarButton = styled.TouchableOpacity`
  margin: 0 4px;
`;

const StarRatingInput = ({
  rating,
  onChange,
  size = 32,
  filledColor = "#FFD700",
  emptyColor = "#CCCCCC",
}) => {
  return (
    <StarContainer>
      {Array.from({ length: MAX_STARS }).map((_, index) => {
        const starValue = index + 1;
        return (
          <StarButton
            key={starValue}
            onPress={() => onChange(starValue)}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={rating >= starValue ? "star" : "star-o"}
              size={size}
              color={rating >= starValue ? filledColor : emptyColor}
            />
          </StarButton>
        );
      })}
    </StarContainer>
  );
};

export default StarRatingInput;
