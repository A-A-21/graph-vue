// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');
// eslint-disable-next-line import/no-extraneous-dependencies
require('moment/locale/ru');

moment.locale('ru', {
  week: {
    dow: 1, // Понедельник
  },
});

function getCurWeek() {
  const today = moment();

  const startOfWeek = today.clone()
    .startOf('week');
  today.clone()
    .subtract(1)
    .endOf('week');
  const daysOfWeek = [];

  for (let i = 0; i < 7; i += 1) {
    const day = startOfWeek.clone()
      .add(i, 'days');
    daysOfWeek.push(day.format('YYYY-MM-DD'));
  }
  return daysOfWeek;
}

export function getAllDays() {
  const currentDate = moment(); // Текущая дата
  const daysInPast = 364; // Количество дней в прошлом

  const daysArray = [];
  for (let i = daysInPast; i >= 0; i -= 1) {
    const date = currentDate.clone()
      .subtract(i, 'days');
    daysArray.push(date.format('YYYY-MM-DD'));
  }
  moment()
    .weekday();
  const weeksArray = [getCurWeek()];
  for (let i = daysArray.length - 5; i >= 0; i -= 7) {
    weeksArray.push(daysArray.slice(i - 7, i));
  }
  return weeksArray.reverse()
    .slice(2);
}

export function getMonths() {
  const currentMonth = moment()
    .month();
  const months = moment.months();

  const monthsIncludingCurrent = [
    ...months.slice(currentMonth + 1),
    ...months.slice(0, currentMonth),
    ...months.slice(currentMonth, currentMonth + 1),
  ];

  return monthsIncludingCurrent.map((month) => month.charAt(0)
    .toUpperCase() + month.slice(1));
}
