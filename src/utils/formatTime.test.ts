import { formatTime } from './formatTime';

describe('formatTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should return "-" for null', () => {
    expect(formatTime(null)).toBe('—');
  });

  test('should return "—" for undefined', () => {
    expect(formatTime(undefined)).toBe('—');
  });

  test('should format Date object correctly', () => {
    const date = new Date('2024-01-01T14:30:00Z');
    const result = formatTime(date);
    expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/);
  });

  test('should format string date correctly', () => {
    const dateString = '2024-01-01T09:15:00Z';
    const result = formatTime(dateString);
    expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/);
  });
});
