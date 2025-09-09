export const formatDate = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toISOString().split("T")[0];
};

export const formatTime = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  return date.toTimeString().slice(0, 5);
};

export const formatDateTime = (date) => {
  if (!(date instanceof Date)) date = new Date(date);
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const addMinutes = (date, minutes) => {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() + minutes);
  return copy;
};
