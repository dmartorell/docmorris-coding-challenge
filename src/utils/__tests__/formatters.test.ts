import { formatCurrency } from '../formatters';
import i18n from '../../locales';

jest.mock('../../locales', () => ({
  default: {
    language: 'en',
  },
}));

describe('formatCurrency', () => {
  const mockedI18n = i18n as jest.Mocked<typeof i18n>;

  beforeEach(() => {
    mockedI18n.language = 'en';
  });

  it('formats a positive number as EUR in English locale', () => {
    const value = 123.45;
    const formatted = formatCurrency(value);
    expect(formatted).toBe('€123.45');
  });

  it('formats a positive number as EUR in German locale', () => {
    mockedI18n.language = 'de';
    const value = 123.45;
    const formatted = formatCurrency(value);
    expect(formatted).toBe('123,45\u00A0€');
  });

  it('formats zero correctly', () => {
    const value = 0;
    const formatted = formatCurrency(value);
    expect(formatted).toBe('€0.00');
  });

  it('formats a negative number correctly', () => {
    const value = -50.75;
    const formatted = formatCurrency(value);
    expect(formatted).toBe('-€50.75');
  });

  it('handles numbers with more than two decimal places by rounding', () => {
    const value = 99.999;
    const formatted = formatCurrency(value);
    expect(formatted).toBe('€100.00');
  });

  it('handles numbers with less than two decimal places by padding', () => {
    const value = 5.5;
    const formatted = formatCurrency(value);
    expect(formatted).toBe('€5.50');
  });
});
