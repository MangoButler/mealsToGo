import React, { useState } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Text } from "../typography/text.component";
import { Checkbox } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const OptionGrid = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const OptionItem = styled.TouchableOpacity`
  flex-basis: 48%;
  margin-bottom: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[2]};
`;

const OptionLabel = styled(Text)`
  color: ${(props) => props.theme.colors.text.secondary};

  margin-left: ${(props) => props.theme.space[1]};
`;

const FEATURES = [
  { label: "Conbini", value: "conbini", icon: "store-24-hour" },
  {
    label: "Supermarket",
    value: "supermarket",
    icon: "store",
  },
  { label: "Toilet", value: "toilet", icon: "toilet" },
  { label: "Raincover", value: "raincover", icon: "weather-rainy" },
  { label: "Benches", value: "benches", icon: "seat" },
  { label: "Table", value: "table", icon: "table-picnic" },
  { label: "Take-Away", value: "take-away", icon: "food-takeout-box" },
  { label: "Sakura spot", value: "sakura-spot", icon: "flower" },
];

const FeaturesSelector = ({ onSelectionChange, preSelected }) => {
  const [selected, setSelected] = useState(preSelected || []);
  const theme = useTheme();

  const toggleFeature = (value) => {
    let updated;
    if (selected.includes(value)) {
      updated = selected.filter((item) => item !== value);
    } else {
      updated = [...selected, value];
    }
    setSelected(updated);
    if (onSelectionChange) onSelectionChange(updated);
  };

  return (
    <OptionGrid>
      {FEATURES.map((feature) => (
        <OptionItem
          key={feature.value}
          onPress={() => toggleFeature(feature.value)}
        >
          <MaterialCommunityIcons
            name={feature.icon}
            size={20}
            color={
              selected.includes(feature.value)
                ? theme.colors.ui.primary
                : theme.colors.text.disabled
            }
          />
          <OptionLabel theme={theme} variant="hint">
            {feature.label}
          </OptionLabel>
          <View style={{ marginLeft: "auto" }}>
            <Checkbox
              status={
                selected.includes(feature.value) ? "checked" : "unchecked"
              }
              onPress={() => toggleFeature(feature.value)}
              uncheckedColor={theme.colors.text.disabled}
              color={theme.colors.ui.primary}
            />
          </View>
        </OptionItem>
      ))}
    </OptionGrid>
  );
};

export default FeaturesSelector;
