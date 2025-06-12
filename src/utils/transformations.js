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

export function safeSuccessRate(total, scheduled, cancelled, noShow) {
  const denominator = total - scheduled;
  if (denominator === 0) return 0;

  const value = (1 - (cancelled + noShow) / denominator) * 100;
  return Math.round(value);
}
