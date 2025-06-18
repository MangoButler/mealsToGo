export function range(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatDateNormal = (date) => {
  const formattedDate = new Date(date);
  return `${formattedDate.getFullYear()}/${(formattedDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${formattedDate.getDate().toString().padStart(2, "0")}`;
};

export const formatTime = (date) => {
  const formattedDate = new Date(date);

  return `${formattedDate.getHours().toString().padStart(2, "0")}:${formattedDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const formatDate = (date) => {
  const d = new Date(date);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  // Determine ordinal suffix
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th"; // 4th–20th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const ordinal = getOrdinal(day);

  return `${dayOfWeek} the ${day}${ordinal} of ${month} ${year}`;
};

export const isWithinTwoHours = (startTime) => {
  const now = new Date();
  const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const startTimeFormatted = new Date(startTime);

  return startTimeFormatted > now && startTimeFormatted <= twoHoursFromNow;
};

export const getClosestPendingHangoutWithinTwoHours = (hangouts) => {
  const upcoming = hangouts
    ?.filter((h) => h.status === "PENDING" && isWithinTwoHours(h.startTime))
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // Closest first

  return upcoming?.[0] || null;
};

export function getApproximateTimeDifference(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);

  const diffMs = target - now;
  const diffMinutes = Math.floor(Math.abs(diffMs) / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (hours === 0) {
    return `${minutes}min`;
  }

  return `${hours}h ${minutes}min`;
}
export function isInPast(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);

  const diffMs = target - now;
  return diffMs < 0;
}

export function safeSuccessRate(total, scheduled, cancelled, noShow) {
  const denominator = total - scheduled;
  if (denominator === 0) return 0;

  const value = (1 - (cancelled + noShow) / denominator) * 100;
  return Math.round(value);
}

export function parseNumber(value) {
  const match = value.match(/^(-?\d+(\.\d+)?)/);
  return match ? parseInt(match[0]) : 0;
}

export const getDrinkIcon = (drink) => {
  const d = drink.toLowerCase();

  if (d.includes("beer")) return "beer";
  if (d.includes("wine")) return "wine-glass-alt";
  if (d.includes("cocktail") || d.includes("martini")) return "cocktail";
  if (
    d.includes("whiskey") ||
    d.includes("whisky") ||
    d.includes("bourbon") ||
    d.includes("scotch")
  )
    return "glass-whiskey";
  if (
    d.includes("vodka") ||
    d.includes("rum") ||
    d.includes("gin") ||
    d.includes("tequila")
  )
    return "glass-whiskey";

  return "wine-bottle"; // default/fallback icon
};

export const getDrinkEmoji = (drink) => {
  if (!drink) return "🍻";

  const d = drink.toLowerCase();

  const emojiMap = {
    beer: "🍺",
    wine: "🍷",
    red: "🍷",
    white: "🍷",
    cocktail: "🍹",
    martini: "🍸",
    whiskey: "🥃",
    whisky: "🥃",
    bourbon: "🥃",
    scotch: "🥃",
    sake: "🍶",
    soju: "🍶",
    vodka: "🍸",
    gin: "🍸",
    rum: "🍸",
    tequila: "🧉",
    champagne: "🍾",
    cider: "🧃",
    mead: "🍯",
    moonshine: "🛢️",
    absinthe: "🧪",
    chuhai: "🧋", // cheap can look
    chuhi: "🧋",
    "chu-hai": "🧋",
  };

  for (const key in emojiMap) {
    if (d.includes(key)) return emojiMap[key];
  }

  return "🍻";
};

export const getShareSentence = (place, current) => {
  const { lat, lng } = place.location.location;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const scheduleDate = current ? null : formatDate(new Date(place.startTime));
  const scheduleTime = current ? null : formatTime(new Date(place.startTime));

  const message = current
    ? `Join me at ${place.title} for some fun! Get directions: ${mapsUrl}. Shared via: Cans&Go.co`
    : `Planning to visit ${place.title} on ${scheduleDate} at ${scheduleTime}, wanna join? Get Directions: ${mapsUrl}. Shared via: Cans&Go.co`;

  return message;
};
