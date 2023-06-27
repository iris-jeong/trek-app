export function getMonth(startDate) {
  let start = startDate.split("-");
  let month;
  if (start[1] === "04") {
    month = "Apr";
  } else {
    month = "Jun";
  }
  return month;
}

export function calculateNumDays(startDate, endDate) {
  // console.log(startDate, endDate);
  let start = startDate.split("-");
  let end = endDate.split("-");
  //0: year, 1: month, 2: day
  //Calculate number of years as days
  let yearsToDays = (end[0] - start[0]) * 365;
  //Calculate the number of months as days
  let monthsToDays = (end[1] - start[1]) * (365 / 12);
  let days = end[2] - start[2];
  let numDays = yearsToDays + monthsToDays + days;
  return Math.ceil(numDays);
}

export function convertTime(x) {
  let time = x.split(":");
  let hour = time[0];
  let isAm = true;
  if (parseInt(hour) > 12) {
    hour = hour - 12;
    isAm = false;
  }

  let newTime = String(hour) + ":" + time[1];
  newTime += isAm ? "am" : "pm";
  return newTime;
}

//Function to get the number of days between 2 dates.
export function getNumDays(start, end) {
  let sDate = new Date(start);
  let eDate = new Date(end);
  let diffInTime = eDate.getTime() - sDate.getTime();
  let diffInDays = diffInTime / (1000 * 3600 * 24);
  return diffInDays + 1;
}
