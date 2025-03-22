import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { navigation } from "./constants";

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
      <div className="min-h-full">
        <Navbar
          items={Object.entries(navigation).map(([name, href]) => ({
            name,
            href,
          }))}
        />
        {children}
      </div>
    </>
  );
};
