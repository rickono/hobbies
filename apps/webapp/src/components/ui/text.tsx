import clsx from "clsx";
import { FC } from "react";

interface Props {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "p";
  children?: string;
  color?: "black" | "white" | "primary";
  italic?: boolean;
  className?: string;
}

export const Text: FC<Props> = ({
  children,
  variant,
  color,
  italic = false,
  className: externalClassName,
}) => {
  const h1Class =
    "font-(family-name:--font-onest) font-bold tracking-wide text-4xl";
  const className = clsx(
    {
      "text-white": color === "white",
      "text-primary": color === "primary",
    },
    variant === "h1" && h1Class,
    variant === "h2" && "text-3xl font-semibold tracking-wide",
    variant === "h3" && "text-2xl font-semibold tracking-wide",
    variant === "h4" && "text-xl font-semibold tracking-wide",
    variant === "h5" && "text-lg font-semibold tracking-wide",
    italic && "italic",
    externalClassName,
  );

  switch (variant) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={className}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "h4":
      return <h4 className={className}>{children}</h4>;
    case "h5":
      return <h4 className={className}>{children}</h4>;
    default:
      return <p className={className}>{children}</p>;
  }
};
