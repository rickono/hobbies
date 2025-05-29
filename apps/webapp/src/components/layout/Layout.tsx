import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export const Layout: FC<Props> = async ({ children }) => {
  // const path = usePathname();
  // const header =
  //   Object.entries(navigation).find(([_, p]) => p === path)?.[1] ?? "Not found";

  return (
    <>
      <div className="min-h-full">{children}</div>
    </>
  );
};
