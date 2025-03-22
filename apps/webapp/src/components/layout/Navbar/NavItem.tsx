import { FC } from "react";
import { cn } from "../../../lib/utils";

interface Props {
  name: string;
  href: string;
  current: boolean;
  onNavigate: VoidFunction;
}

export const NavItem: FC<Props> = ({ name, href, current, onNavigate }) => {
  return (
    <a
      key={name}
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        current
          ? "border-primary text-gray-900"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
      )}
      onClick={onNavigate}
    >
      {name}
    </a>
  );
};
