export function moneyUSD(n: number | string | null | undefined): string {
  const num = Number(n);
  if (Number.isNaN(num) || num <= 0) return "-";
  try {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `$${num}`;
  }
}
