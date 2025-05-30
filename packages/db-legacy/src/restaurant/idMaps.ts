export const CURRENCY_IDS = ["usd"] as const;
export type CurrencyId = (typeof CURRENCY_IDS)[number];
export const currencyIds: Record<CurrencyId, string> = {
  usd: "United States Dollar",
};
