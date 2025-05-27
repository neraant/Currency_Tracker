import { ActiveElement, ChartConfiguration } from 'chart.js';
import { DarkTheme } from '@styles/Theme';
import { IChartDataPoint } from '@typings/chart';

interface IChartConfigParams {
  data: IChartDataPoint[];
  onBarClick: (elements: ActiveElement[]) => void;
}

export const getChartConfig = ({
  data,
  onBarClick,
}: IChartConfigParams): ChartConfiguration<'candlestick'> => {
  return {
    type: 'candlestick',
    data: {
      datasets: [
        {
          data,
          backgroundColors: {
            up: DarkTheme.neutral.green300,
            down: DarkTheme.neutral.red300,
            unchanged: '',
          },
          borderColors: {
            up: DarkTheme.neutral.green300,
            down: DarkTheme.neutral.red300,
            unchanged: '',
          },
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: true,
          borderColor: '#474747',
          backgroundColor: DarkTheme.background.primary,
          titleColor: DarkTheme.text.primary,
          bodyColor: DarkTheme.text.primary,
          borderWidth: 1,
          displayColors: false,
          padding: 12,
          cornerRadius: 6,
          titleFont: {
            size: 13,
            weight: 'bold',
          },
          bodyFont: {
            size: 12,
          },
          callbacks: {
            label: function (context) {
              const raw = context.raw as { o: number; h: number; l: number; c: number };
              const { o, h, l, c } = raw;
              return `O: ${o}, H: ${h}, L: ${l}, C: ${c}`;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
          adapters: {
            date: {
              zone: 'utc',
            },
          },
        },
        y: {
          type: 'linear',
        },
      },
      onClick: (event, activeElements, chart) => {
        const elements =
          chart.getElementsAtEventForMode(event as any, 'nearest', { intersect: true }, false) ||
          [];

        onBarClick(elements);
      },
    },
  };
};
