export const slugify = (input: string, delimiter: string = " "): string => {
  return input.toLowerCase().split(delimiter).join("-");
};
