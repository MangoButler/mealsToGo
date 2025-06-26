import { getUserLocation } from "./location.functions";
import { getNextHourWeather } from "./weather";

// // Define seasons for temperate zones
// const getSeason = (month, lat) => {
//   const isTropical = Math.abs(lat) < 10; // Rough approximation
//   if (isTropical) return null;

//   if (lat >= 0) {
//     // Northern Hemisphere
//     if (month >= 2 && month <= 4) return "spring";
//     if (month >= 5 && month <= 7) return "summer";
//     if (month >= 8 && month <= 10) return "autumn";
//     return "winter";
//   } else {
//     // Southern Hemisphere
//     if (month >= 2 && month <= 4) return "autumn";
//     if (month >= 5 && month <= 7) return "winter";
//     if (month >= 8 && month <= 10) return "spring";
//     return "summer";
//   }
// };

// const timeOfDay = () => {
//   const hour = new Date().getHours();
//   if (hour < 5) return "late night";
//   if (hour < 11) return "morning";
//   if (hour < 17) return "afternoon";
//   if (hour < 21) return "evening";
//   return "night";
// };

// const messages = {
//   clear: [
//     "Perfect weather to kick back and chill!",
//     "Sun’s out — time to vibe!",
//     "Blue skies and good times ahead.",
//   ],
//   rain: [
//     "Rain or shine, let's enjoy it!",
//     "Don't forget your umbrella — or your can!",
//     "Even the rain can't stop a good hangout.",
//     "Drinking in the rain, I'm drinking in the rain...",
//   ],
//   cloudy: [
//     "Moody skies, mellow vibes.",
//     "Clouds above, but spirits high.",
//     "Perfect weather for a cozy get-together.",
//   ],
//   storm: [
//     "Stormy skies, brave souls!",
//     "Hope you're under cover — or sharing one!",
//   ],
//   fog: [
//     "It’s a little hazy, but the fun is crystal clear.",
//     "Misty vibes make for mysterious meetups.",
//   ],
//   snow: [
//     "Snowy hangouts hit different.",
//     "Winter wonderland — bring the warmth!",
//     "Why are they not selling hot sake at konbinis yet? Seriousely...",
//   ],
//   spring: [
//     "Spring blooms and good brews.",
//     "Fresh air and fresh vibes — it’s spring!",
//     "Spring in the air cans open everywhere!",
//   ],
//   summer: [
//     "Hot days, cold cans. Summer's on!",
//     "Nothing beats a summer hangout.",
//     "Hot days and cool brews ahead:",
//   ],
//   autumn: [
//     "Leaves fall, but spirits rise.",
//     "Autumn breeze, perfect hangout tease.",
//     "It's fall, open the cans y'all.",
//     "It’s fall — time to open some cans and have a ball!",
//     "Leaves are falling, cans are calling.",
//   ],
//   winter: [
//     "Bundle up — it’s hangout season anyway!",
//     "Frosty air, warm company.",
//     "Hot wine makes a good time!",
//   ],
//   default: [
//     "Welcome to the hangout!",
//     "Let’s make some memories.",
//     "Time to chill and connect.",
//     "Here’s to new stories and good times.",
//     "Vibes incoming. You ready?",
//     "Welcome to:",
//     "You made it to:",
//     "You're now hanging out at:",
//     "Glad you're here – welcome to:",
//     "Chill mode activated at:",
//     "Ready to vibe at:",
//     "Good choice! You're at:",
//     "Great spot! Say hello to:",
//     "Your hangout destination is:",
//     "Currently soaking in the vibes at:",
//   ],
// };

// const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// export const getWelcomeMessage = async () => {
//   try {
//     const location = await getUserLocation();
//     if (!location) {
//       // fallback if no location
//       return randomFrom(messages.default);
//     }

//     const weather = await getNextHourWeather();
//     const { latitude } = location;
//     const month = new Date().getMonth(); // 0-based
//     const season = getSeason(month, latitude);

//     const condition = weather?.description?.toLowerCase() || "";
//     const time = timeOfDay();
//     console.log(condition); //Logging
//     // Try weather-based messages
//     if (condition.includes("clear")) return randomFrom(messages.clear);
//     if (condition.includes("rain")) return randomFrom(messages.rain);
//     if (condition.includes("cloud")) return randomFrom(messages.cloudy);
//     if (condition.includes("fog")) return randomFrom(messages.fog);
//     if (condition.includes("snow")) return randomFrom(messages.snow);
//     if (condition.includes("thunder") || condition.includes("storm"))
//       return randomFrom(messages.storm);

//     // Fall back to seasonal messages (if available)
//     if (season && messages[season]) return randomFrom(messages[season]);

//     // Fallback to default
//     return randomFrom(messages.default);
//   } catch (e) {
//     console.warn("Welcome message fallback due to error:", e);
//     return randomFrom(messages.default);
//   }
// };

const getSeason = (month, lat) => {
  const isTropical = Math.abs(lat) < 10; // Rough approximation
  if (isTropical) return null;

  if (lat >= 0) {
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
  } else {
    if (month >= 2 && month <= 4) return "autumn";
    if (month >= 5 && month <= 7) return "winter";
    if (month >= 8 && month <= 10) return "spring";
    return "summer";
  }
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "late night";
  if (hour < 11) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
};

const messages = {
  season: {
    spring: [
      "Spring blooms and good brews.",
      "Fresh air and fresh vibes — it’s spring!",
      "Spring in the air, cans everywhere!",
    ],
    summer: [
      "Hot days, cold cans. Summer's on!",
      "Nothing beats a summer hangout.",
      "Hot days and cool brews ahead!",
    ],
    autumn: [
      "Leaves fall, but spirits rise.",
      "Autumn breeze, perfect hangout tease.",
      "It’s fall — time to open some cans and have a ball!",
      "Leaves are falling, cans are calling.",
    ],
    winter: [
      "Bundle up — it’s hangout season anyway!",
      "Frosty air, warm company.",
      "Hot wine makes a good time!",
    ],
  },
  timeOfDay: {
    morning: [
      "Good morning — perfect time for a sunny sip!",
      "Start your day with a chill vibe.",
      "Sun’s up, cans up!",
    ],
    afternoon: [
      "Afternoon delight — let’s hang!",
      "Breezy afternoons and easygoing vibes.",
      "What a fine time to unwind!",
    ],
    evening: [
      "Evening’s here — let’s get cozy!",
      "Golden hour, golden vibes.",
      "It’s chill o’clock!",
    ],
    night: [
      "Night owls unite!",
      "Stars above, friends beside.",
      "Midnight sips and moonlight chats.",
    ],
    "late night": [
      "Late night legends only.",
      "After hours hangouts hit different.",
      "Quiet streets, loud laughs.",
    ],
  },
  weather: {
    clear: [
      "Perfect weather to kick back and chill!",
      "Sun’s out — time to vibe!",
      "Blue skies and good times ahead.",
    ],
    rain: [
      "Rain or shine, let's enjoy it!",
      "Don't forget your umbrella — or your can!",
      "Even the rain can't stop a good hangout.",
      "Drinking in the rain, I'm drinking in the rain...",
    ],
    cloudy: [
      "Moody skies, mellow vibes.",
      "Clouds above, but spirits high.",
      "Perfect weather for a cozy get-together.",
    ],
    storm: [
      "Stormy skies, brave souls!",
      "Hope you're under cover — or sharing one!",
    ],
    fog: [
      "It’s a little hazy, but the fun is crystal clear.",
      "Misty vibes make for mysterious meetups.",
    ],
    snow: [
      "Snowy hangouts hit different.",
      "Winter wonderland — bring the warmth!",
      "Why are they not selling hot sake at konbinis yet? Seriously...",
    ],
  },
  default: [
    "Welcome to the hangout!",
    "Let’s make some memories.",
    "Time to chill and connect.",
    "Here’s to new stories and good times.",
    "Vibes incoming. You ready?",
    "Welcome to:",
    "You made it to:",
    "You're now hanging out at:",
    "Glad you're here – welcome to:",
    "Chill mode activated at:",
    "Ready to vibe at:",
    "Good choice! You're at:",
    "Great spot! Say hello to:",
    "Your hangout destination is:",
    "Currently soaking in the vibes at:",
    "Now that you're here, get your first beer!",
  ],
};

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getWelcomeMessage = async () => {
  try {
    const location = await getUserLocation();
    const weather = await getNextHourWeather();

    const lat = location?.latitude ?? 0;
    const month = new Date().getMonth();
    const season = getSeason(month, lat);
    const time = getTimeOfDay();
    const condition = weather?.description?.toLowerCase() ?? "";

    // Randomly pick a message category
    const categories = ["season", "timeOfDay", "weather"];
    const selectedCategory = randomFrom(categories);

    // Choose message based on actual context
    if (selectedCategory === "season" && season && messages.season[season]) {
      return randomFrom(messages.season[season]);
    }

    if (selectedCategory === "timeOfDay" && messages.timeOfDay[time]) {
      return randomFrom(messages.timeOfDay[time]);
    }

    if (selectedCategory === "weather") {
      if (condition.includes("clear"))
        return randomFrom(messages.weather.clear);
      if (condition.includes("rain")) return randomFrom(messages.weather.rain);
      if (condition.includes("cloud"))
        return randomFrom(messages.weather.cloudy);
      if (condition.includes("fog")) return randomFrom(messages.weather.fog);
      if (condition.includes("snow")) return randomFrom(messages.weather.snow);
      if (condition.includes("storm") || condition.includes("thunder"))
        return randomFrom(messages.weather.storm);
    }

    // Fallback
    return randomFrom(messages.default);
  } catch (e) {
    console.warn("Error fetching welcome message, falling back:", e);
    return randomFrom(messages.default);
  }
};
