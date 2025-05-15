import countries from "i18n-iso-countries";

// Load English names
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Get all countries: { AF: "Afghanistan", AL: "Albania", ... }
const countryNames = countries.getNames("en", { select: "official" });

const getFlagEmoji = (countryCode) =>
  countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));

const countryList = Object.entries(countryNames).map(([code, name]) => ({
  label: `${getFlagEmoji(code)} ${name}`,
  value: code,
}));

export default countryList;
