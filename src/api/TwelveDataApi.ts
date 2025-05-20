import axios from 'axios';

const API_KEY = process.env.REACT_TWELVEDATA_API_KEY;
const BASE_URL = process.env.REACT_TWELVEDATA_BASE_UTL;

export const fetchChartData = async (symbol: string, period: string) => {
  if (!API_KEY || !BASE_URL) {
    throw new Error('Missing environment variables');
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/time_series?symbol=${symbol}&interval=${period}&apikey=${API_KEY}`
    );

    return data;
  } catch (error) {
    console.error('Error while fetching data TWELVEDATA: ', error);
    throw error;
  }
};
