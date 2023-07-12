export function RandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function getSuffix(number) {
  if (number === (1 || 21 || 31)) return "st";
  if (number === (2 || 22)) return "nd";
  if (number === (3 || 23)) return "rd";
  return "th";
}

export function getDateFormat(date) {
  const monthsString = [
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
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const suffix = getSuffix(day);
  return `${monthsString[month]} ${day}${suffix} ${year}`;
}
