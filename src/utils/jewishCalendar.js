import { HDate } from '@hebcal/core';

export const getJewishMonthBoundaries = () => {
  const now = new Date();
  const jewishDate = new HDate(now);
  const year = jewishDate.getFullYear();
  const month = jewishDate.getMonth();

  const startDate = new HDate(1, month, year).greg();
  const endDate = new HDate(1, month + 1, year).greg();

  return {
    start: startDate,
    end: new Date(endDate.setDate(endDate.getDate() - 1)),
  };
};