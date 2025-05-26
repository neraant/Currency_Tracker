import { BankDetail } from '@typings/bank';

export const filterBanksLocations = (
  locations: BankDetail[],
  targetCurrency: string
): BankDetail[] => {
  if (!targetCurrency.trim()) return locations;

  const target = targetCurrency.toLowerCase();

  return locations.filter((bank) =>
    bank.currencies.some((currency) => currency.toLowerCase() === target)
  );
};
