import { TwelveDataApiResponse } from '@typings/twelvedataapi';
import { ENV } from '@utils/env';
import { twelveDataClient } from './clients';

export const fetchChartData = async (symbol: string, period: string) => {
  try {
    const data = await twelveDataClient.get<TwelveDataApiResponse>('/time_series', {
      params: {
        symbol,
        interval: period,
        apikey: ENV.TWELVEDATA_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error('Error while fetching data TWELVEDATA: ', error);
    throw error;
  }
};
