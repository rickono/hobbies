import clsx from "clsx";
import { FC } from "react";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export const Button: FC<Props> = ({ size = "md", className, children }) => {
  const sizeClass = clsx({
    "px-2 py-1 text-xs": size === "xs",
    "px-2 py-1 text-sm": size === "sm",
    "px-2.5 py-1.5 text-sm": size === "md",
    "px-3 py-2 text-sm": size === "lg",
    "px-3.5 py-2.5 text-sm": size === "xl",
  });

  return (
    <button
      type="button"
      className={clsx(
        className,
        sizeClass,
        "rounded-sm bg-primary font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      {children}
    </button>
  );
};
