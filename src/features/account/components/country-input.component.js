import React, { useState } from "react";
import { Dropdown } from "react-native-paper-dropdown";
import FormTextInput from "../../../components/form/form-text-input.component";

import countryList from "../../../utils/countryList";
// import { TextInput } from "react-native-paper";
// import { theme } from "../../../infrastructure/theme";
// // Helper: Convert country code (e.g., "JP") to 🇯🇵
// const getFlagEmoji = (countryCode) =>
//   countryCode
//     .toUpperCase()
//     .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));

// // Define country list with emojis in the label
// const rawCountries = [
//   { name: "United States", code: "US" },
//   { name: "Germany", code: "DE" },
//   { name: "Japan", code: "JP" },
//   { name: "Indonesia", code: "ID" },
//   { name: "India", code: "IN" },
//   { name: "France", code: "FR" },
//   { name: "Switzerland", code: "CH" },
//   { name: "United Kingdom", code: "GB" },
//   { name: "Canada", code: "CA" },
//   { name: "Australia", code: "AU" },
// ];

// const countries = rawCountries.map(({ name, code }) => ({
//   label: `${getFlagEmoji(code)} ${name}`,
//   value: code,
// }));

// const CustomDropdownInput = () => {
//   return (
//     <TextInput
//       label="Country"
//       mode="outlined"
//       outlineColor={theme.colors.ui.primary}
//       textColor={theme.colors.text.primary}
//       activeOutlineColor={theme.colors.ui.primary}
//       dense
//       right={<TextInput.Icon icon={"chevron-down"} />}
//     />
//   );
// };

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
