import { Dropdown } from "react-native-paper-dropdown";
// import React from "react";
// import { TouchableOpacity } from "react-native";
// import styled from "styled-components/native";
// import { Text } from "../typography/text.component";

import { DropdownAnchor } from "./dropdown-selector.styles";
const DropdownSelector = ({ value, onChange, data, ...props }) => {
  const selectedLabel = value
    ? data.find((item) => item.value === value)?.label
    : "Select";

  return (
    <Dropdown
      label={selectedLabel}
      options={data}
      value={value}
      onSelect={onChange}
      mode="flat"
      hideMenuHeader="true"
      CustomDropdownInput={({ onPress }) => (
        <DropdownAnchor onPress={onPress} label={selectedLabel} {...props} />
      )}
    />
  );
};

export default DropdownSelector;
