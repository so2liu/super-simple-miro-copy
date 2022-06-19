const roundTo = (n: number, r: number) => Math.round(n / r) * r;

export const roundTo10 = (n: number) => roundTo(n, 10);
