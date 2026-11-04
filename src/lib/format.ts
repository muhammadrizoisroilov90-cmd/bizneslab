const formatter = new Intl.NumberFormat('ru-RU');

export function formatNumber(value: number): string {
  return formatter.format(Math.round(value)).replace(/\u00A0/g, ' ');
}

export function formatSum(value: number): string {
  return `${formatNumber(value)} so'm`;
}

export function formatCompactSum(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace('.0', '')} mlrd so'm`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.0', '')} mln so'm`;
  if (value >= 1_000) return `${Math.round(value / 1_000)} ming so'm`;
  return formatSum(value);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function percent(value: number, max: number): number {
  if (max <= 0) return 0;
  return clamp((value / max) * 100, 0, 100);
}
