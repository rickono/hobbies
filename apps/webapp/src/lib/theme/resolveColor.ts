export type Color = "white" | "black" | "primary";
export const resolveTextColor = (color: Color): string => {
  switch (color) {
    case "white":
      return "text-white";
    case "black":
      return "text-black";
    case "primary":
      return "text-yellow";
  }
};

export const resolveBackgroundColor = (color: Color): string => {
  switch (color) {
    case "white":
      return "bg-white";
    case "black":
      return "bg-black";
    case "primary":
      return "bg-";
  }
};
