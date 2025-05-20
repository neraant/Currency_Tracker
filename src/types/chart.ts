export interface IFormValidationState {
  open: boolean;
  high: boolean;
  low: boolean;
  close: boolean;
  allValid: boolean;
}

export interface IChartEntry {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

export interface IChartBar {
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  timestamp?: number;
}

export interface IChartBarFormData {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

export type ChartFieldName = 'open' | 'high' | 'low' | 'close';

export interface IChartField {
  name: ChartFieldName;
  label: string;
}
