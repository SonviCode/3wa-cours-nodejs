export const handleDate = (date) => {
  const newDate = new Date(reverseDateMounthDay(date));

  const formattedDate = newDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};

export const reverseDateMounthDay = (date) => {
  const dateArray = date.split("-");
  const temp = dateArray[1];
  dateArray[1] = dateArray[2];
  dateArray[2] = temp;

  return dateArray.toString();
};
