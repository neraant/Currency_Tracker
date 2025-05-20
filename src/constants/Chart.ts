export const CHART_BAR_FIELDS = [
  { name: 'open', label: 'Open' },
  { name: 'high', label: 'High' },
  { name: 'low', label: 'Low' },
  { name: 'close', label: 'Close' },
] as const;

export type ChartFieldName = (typeof CHART_BAR_FIELDS)[number]['name'];
