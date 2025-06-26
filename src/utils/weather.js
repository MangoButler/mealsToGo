// Adjust path as needed

import { getUserLocation } from "./location.functions";

// Mapping of Open-Meteo weather codes to descriptions
const weatherCodeMap = {
  0: "clear",
  1: "mainly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "fog",
  48: "depositing rime fog",
  51: "light drizzle",
  53: "moderate drizzle",
  55: "dense drizzle",
  56: "light freezing drizzle",
  57: "dense freezing drizzle",
  61: "slight rain",
  63: "moderate rain",
  65: "heavy rain",
  66: "light freezing rain",
  67: "heavy freezing rain",
  71: "slight snow fall",
  73: "moderate snow fall",
  75: "heavy snow fall",
  77: "snow grains",
  80: "slight rain showers",
  81: "moderate rain showers",
  82: "violent rain showers",
  85: "slight snow showers",
  86: "heavy snow showers",
  95: "thunderstorm",
  96: "thunderstorm with slight hail",
  99: "thunderstorm with heavy hail",
};

export const getNextHourWeather = async () => {
  try {
    const location = await getUserLocation();
    if (!location) return null;

    const { latitude, longitude } = location;

    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    const nextHourISOString = nextHour.toISOString().slice(0, 13) + ":00";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    const index = data.hourly.time.findIndex((t) => t === nextHourISOString);
    if (index === -1) return null;

    const weatherCode = data.hourly.weathercode[index];
    const description = weatherCodeMap[weatherCode] || "unknown";

    return {
      weatherCode,
      description,
    };
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    return null;
  }
};
