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
      animation: {
        duration: 800, // Длительность анимации в миллисекундах
        easing: 'easeInOutQuart', // Тип анимации
      },
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true,
        },
      },
      transitions: {
        active: {
          animation: {
            duration: 400,
          },
        },
      },
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
          titleColor: DarkTheme.border.primary,
          bodyColor: DarkTheme.border.primary,
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
          grid: {
            display: true,
            color: DarkTheme.border.primary,
            lineWidth: 1,
          },
          ticks: {
            color: DarkTheme.border.primary,
          },
        },
        y: {
          type: 'linear',
          grid: {
            display: true,
            color: DarkTheme.border.primary,
            lineWidth: 1,
          },
          ticks: {
            color: DarkTheme.border.primary,
          },
        },
      },
      onClick: (event, activeElements, chart) => {
        const elements =
          chart.getElementsAtEventForMode(event as any, 'nearest', { intersect: false }, false) ||
          [];

        onBarClick(elements);
      },
      onHover: (event, activeElements, chart) => {
        const canvas = chart.canvas;

        const elements = chart.getElementsAtEventForMode(
          event as any,
          'nearest',
          { intersect: false },
          false
        );

        if (elements && elements.length > 0) {
          canvas.style.cursor = 'pointer';
        } else {
          canvas.style.cursor = 'default';
        }
      },
    },
  };
};
