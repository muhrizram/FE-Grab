export const dateFormat = (dateTime: string) => {
  const dateTimeObj = new Date(dateTime);
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateTimeObj.toLocaleDateString("en-US", optionsDate);
  return formattedDate;
};

export const timeFormat = (dateTime: string) => {
  const dateTimeObj = new Date(dateTime);
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = dateTimeObj.toLocaleTimeString("en-US", optionsTime);
  return formattedTime;
};
