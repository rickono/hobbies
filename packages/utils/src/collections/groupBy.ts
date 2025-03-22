type GroupBy<
  T extends Record<string | number | symbol, any>,
  K extends keyof T,
> = Record<T[K], T[]>;

export function groupBy<
  T extends Record<string | number | symbol, any>,
  K extends keyof T,
>(arr: T[], key: K): GroupBy<T, K> {
  return arr.reduce(
    (acc, item) => {
      const groupKey = item[key]; // Ensure key is a valid type

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }

      acc[groupKey].push(item);
      return acc;
    },
    {} as GroupBy<T, K>,
  );
}
