import { IChartEntry } from '@typings/chart';

export const parseChartData = (data: IChartEntry[]) => {
  return data.map((entry) => ({
    x: new Date(entry.datetime).getTime(),
    o: parseFloat(entry.open),
    h: parseFloat(entry.high),
    l: parseFloat(entry.low),
    c: parseFloat(entry.close),
  }));
};
