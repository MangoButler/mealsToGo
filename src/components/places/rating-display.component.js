import { View } from "react-native";
import React from "react";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";
import { IconContainer } from "../../features/places/components/places-info-card.styles";
import { SvgXml } from "react-native-svg";
import { Spacer } from "../spacer/spacer.component";
import star from "../../../assets/star";

const RatingDisplay = ({ averageRating, reviewCount, placeId }) => {
  const ratingArray = Array.from(new Array(Math.round(averageRating)));

  if (!ratingArray.length) return <Text variant={"info"}>No ratings yet</Text>;
  return (
    <View>
      <IconContainer>
        {ratingArray.map((_, i) => (
          <SvgXml
            xml={star}
            width={20}
            height={20}
            key={`star-${placeId}-${i}`}
          />
        ))}
      </IconContainer>
      <Spacer position="top" size="small" />
      <Text variant="info">{`${reviewCount} Review${reviewCount > 1 ? "s" : ""}`}</Text>
    </View>
  );
};

export default RatingDisplay;
