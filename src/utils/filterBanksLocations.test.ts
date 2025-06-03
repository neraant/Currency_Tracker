import { BankDetail } from '@typings/bank';
import { CurrencyCode } from '@typings/currency';
import { filterBanksLocations } from './filterBanksLocations';

describe('filterBanksLocations', () => {
  const mockBanks: BankDetail[] = [
    {
      name: 'Сбер Банк',
      coordinates: { lat: 53.909956, lng: 27.576363 },
      address: 'просп. Независимости, 39',
      currencies: ['USD', 'EUR', 'CAD'],
      workingHours: {
        'mon-fri': '09:00–18:00',
        sat: '10:00–14:00',
        sun: 'выходной',
      },
      phone: '+375 (17) 300-11-22',
    },
    {
      name: 'Беларусбанк',
      coordinates: { lat: 53.911592, lng: 27.579248 },
      address: 'просп. Независимости, 44',
      currencies: ['BTC', 'USD', 'EUR', 'AUD'],
      workingHours: {
        'mon-fri': '08:30–19:00',
        sat: '09:00–15:00',
        sun: 'выходной',
      },
      phone: '+375 (17) 222-33-44',
    },
    {
      name: 'ВТБ',
      coordinates: { lat: 53.915956, lng: 27.588013 },
      address: 'ул. Гикало, 3',
      currencies: ['JPY', 'USD', 'ARS'],
      workingHours: {
        'mon-fri': '09:00–17:00',
        sat: 'выходной',
        sun: 'выходной',
      },
      phone: '+375 (17) 555-66-77',
    },
    {
      name: 'Технобанк',
      coordinates: { lat: 53.918329, lng: 27.585864 },
      address: 'ул. Якуба Коласа, 4',
      currencies: ['BWR', 'JPY', 'ARS'],
      workingHours: {
        'mon-fri': '10:00–19:00',
        sat: '10:00–14:00',
        sun: 'выходной',
      },
      phone: '+375 (17) 400-55-66',
    },
    {
      name: 'Банк РРБ',
      coordinates: { lat: 53.907866, lng: 27.590725 },
      address: 'Краснозвёздная ул., 18',
      currencies: ['ASD', 'ARS', 'EUR', 'GBP'],
      workingHours: {
        'mon-fri': '09:00–17:30',
        sat: 'выходной',
        sun: 'выходной',
      },
      phone: '+375 (17) 777-88-99',
    },
  ];

  test('should return all banks when targetCurrency is empty string', () => {
    const result = filterBanksLocations(mockBanks, '');
    expect(result).toBe(mockBanks);
  });

  test('should return all banks when targetCurrency is whitespace only', () => {
    const result = filterBanksLocations(mockBanks, '   ');
    expect(result).toEqual(mockBanks);
  });

  test('should return empty array when no banks have target currency', () => {
    const result = filterBanksLocations(mockBanks, 'RUB');
    expect(result).toEqual([]);
  });

  test('should handle single matching bank', () => {
    const result = filterBanksLocations(mockBanks, CurrencyCode.CAD);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Сбер Банк');
  });

  test('should handle empty banks array', () => {
    const result = filterBanksLocations([], 'USD');
    expect(result).toEqual([]);
  });

  test('should handle mixed case currency search', () => {
    const result = filterBanksLocations(mockBanks, 'EuR');
    expect(result).not.toBe([]);
  });
});
