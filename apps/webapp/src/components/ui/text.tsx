import clsx from "clsx";
import { FC } from "react";

interface Props {
  variant?: "h1";
  children?: string;
  color?: "black" | "white" | "primary";
}

export const Text: FC<Props> = ({ children, variant, color }) => {
  const h1Class = "font-(family-name:--font-onest) tracking-wide";
  const className = clsx(
    "text-4xl font-bold",
    {
      "text-white": color === "white",
      "text-primary": color === "primary",
    },
    variant === "h1" && h1Class,
  );

  switch (variant) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    default:
      return <p>{children}</p>;
  }
};
