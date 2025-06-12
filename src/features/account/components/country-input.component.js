import React, { useState } from "react";
import { Dropdown } from "react-native-paper-dropdown";
import FormTextInput from "../../../components/form/form-text-input.component";

import countryList from "../../../utils/countryList";

const CountrySelector = ({ value, onChange }) => {
  return (
    <Dropdown
      label={
        value && value !== "Not set"
          ? countryList.find((country) => country.value === value).label
          : "Country"
      }
      options={countryList}
      value={value}
      onSelect={onChange}
      mode="outlined"
      hideMenuHeader="true"
      CustomDropdownInput={FormTextInput}
    />
  );
};

export default CountrySelector;
