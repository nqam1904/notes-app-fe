// ----------------------------------------------------------------------

export type InputNumberValue = string | number | null | undefined;

type Options = Intl.NumberFormatOptions | undefined;

const DEFAULT_LOCALE = { code: "vi-VN", currency: "VND" };

function processInput(inputValue: InputNumberValue): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

// ----------------------------------------------------------------------

export function formatNumber(inputValue: InputNumberValue, options?: Options) {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(DEFAULT_LOCALE.code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function formatCurrency(
  inputValue: InputNumberValue,
  options?: Options,
) {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(DEFAULT_LOCALE.code, {
    style: "currency",
    currency: DEFAULT_LOCALE.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function formatPercent(inputValue: InputNumberValue, options?: Options) {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(DEFAULT_LOCALE.code, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(number / 100);

  return fm;
}

// ----------------------------------------------------------------------

export function formatShortenNumber(
  inputValue: InputNumberValue,
  options?: Options,
) {
  const number = processInput(inputValue);
  if (number === null) return "";

  const fm = new Intl.NumberFormat(DEFAULT_LOCALE.code, {
    notation: "compact",
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}
