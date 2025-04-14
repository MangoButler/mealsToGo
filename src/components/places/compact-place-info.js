import { TouchableOpacity } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../typography/text.component";

const CompactImage = styled.Image`
  border-radius: ${(props) => props.theme.space[1]};
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: ${(props) => props.theme.space[1]};
  max-width: 120px;
  align-items: center;
`;

const CompactPlaceInfo = ({ place }) => {
  const theme = useTheme();
  const { photos, name } = place;
  return (
    <TouchableOpacity>
      <Item>
        <CompactImage src={photos[0]} />
        <Text theme={theme} variant={"label"}>
          {name}
        </Text>
      </Item>
    </TouchableOpacity>
  );
};

export default CompactPlaceInfo;
