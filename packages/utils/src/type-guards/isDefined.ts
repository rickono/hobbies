export const isDefined = <T>(source: T | undefined | null): source is T => {
  return source !== undefined && source !== null;
};
