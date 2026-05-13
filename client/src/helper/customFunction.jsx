import multiavatar from "@multiavatar/multiavatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const getColor = (task) => {
  if (task == "completed") {
    return "green";
  } else {
    return "red";
  }
};

export const getRandomColor = () => {
  const colorArr = [
    "#1058FF",
    "#0C8CBA",
    "#05C5C6",
    "#4CC4ED",
    "#14305E",
    "#F31EF1",
    "#07C50C",
    "#002D86",
    "#B80550",
    "#3112BE",
  ];
  return colorArr[Math.floor(Math.random() * 10)];
};

export const getTimeAgo = (time) => {
  if (time == 0 || time == "") {
    return "long time ago";
  }
  return `${dayjs(time).toNow(true)} ago`;
};

export const getTimeDifferenceInMinute = (time) => {
  return dayjs(Date.now()).diff(dayjs(time), "minute");
};

export const getAvatarUrl = (seed = "guest") => {
  const svg = multiavatar(seed);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getRandomNumber = ({ min = 10, max = 200 }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatISODate = (timestamp) => {
  let dateObj;

  if (
    typeof timestamp === "number" ||
    (typeof timestamp === "string" && /^\d+$/.test(timestamp))
  ) {
    dateObj = new Date(Number(timestamp));
  } else {
    dateObj = new Date(timestamp);
  }

  // Fallback for invalid date
  if (isNaN(dateObj.getTime())) {
    dateObj = new Date();
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: dateObj.getDate(),
    month: months[dateObj.getMonth()],
    year: dateObj.getFullYear(),
    day: days[dateObj.getDay()],
    time: formattedTime,
    hours: dateObj.getHours(),
    mins: dateObj.getMinutes(),
  };
};

export const formatTime = (isoString) => {
  const { date, day, month, time, year } = formatISODate(isoString);
  return isoString ? `${time}` : "";
};
