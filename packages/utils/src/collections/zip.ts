export const zip = <T, U>(a: T[], b: U[]): Array<[T, U]> => {
  const length = Math.min(a.length, b.length);
  const result: Array<[T, U]> = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = [a[i]!, b[i]!];
  }

  return result;
};
