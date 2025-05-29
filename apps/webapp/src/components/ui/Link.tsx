import { FC } from "react";

interface Props {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

export const Link: FC<Props> = ({ children, href, className }) => {
  return (
    <a
      href={href}
      className={`text-primary text-sm font-semibold hover:underline hover:text-primary ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
