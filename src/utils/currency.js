// Single source of truth for currency display: Bangladeshi Taka, prefixed symbol, grouped digits.
export const formatCurrency = (amount) => `৳${Number(amount || 0).toLocaleString()}`;
