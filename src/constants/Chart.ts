export const CHART_BAR_FIELDS = [
  { name: 'open', label: 'Open' },
  { name: 'high', label: 'High' },
  { name: 'low', label: 'Low' },
  { name: 'close', label: 'Close' },
] as const;

export const INITIAL_BAR_STATE = {
  open: '',
  high: '',
  low: '',
  close: '',
  validation: {
    open: true,
    high: true,
    low: true,
    close: true,
    allValid: true,
  },
};

export const FULL_DATA_QNTY = 30;

export const CHART_WIDTH = 1000;

export const CHART_HEIGHT = 400;

export type ChartFieldName = (typeof CHART_BAR_FIELDS)[number]['name'];
