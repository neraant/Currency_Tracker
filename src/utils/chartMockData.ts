import { DateTime } from 'luxon';
import { MAX_COEF, MID_COEF, MIN_COEF } from '@constants/chart';

export interface IChartEntry {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

type LuxonDateTime = InstanceType<typeof DateTime>;

export const getRandomData = () => {
  const barData: IChartEntry[] = [];
  let date = DateTime.now().minus({ days: 30 });
  let lastClose = 30;

  for (let i = 0; i < lastClose; i++) {
    const bar = getRandomBar(date, lastClose);
    lastClose = parseFloat(bar.close);
    barData.push(bar);
    date = date.plus({ days: 1 });
  }

  console.log(barData);
  return barData;
};

export const getRandomBar = (date: LuxonDateTime, lastClose: number): IChartEntry => {
  const open = getRandomNumber(lastClose * MID_COEF, lastClose * MAX_COEF);
  const close = getRandomNumber(open * MID_COEF, open * MAX_COEF);
  const high = getRandomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
  const low = getRandomNumber(Math.min(open, close) * MIN_COEF, Math.min(open, close));

  return {
    datetime: date.toISO(),
    open: open.toFixed(2),
    high: high.toFixed(2),
    low: low.toFixed(2),
    close: close.toFixed(2),
  };
};

export const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
