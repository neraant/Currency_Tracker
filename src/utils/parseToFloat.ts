export const parseToFloat = (values: string[]): number[] => {
  return [...values.map((value) => parseFloat(value))];
};
