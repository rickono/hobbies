import { FC, ReactNode } from "react";
import { navigation } from "../layout/constants";
import { Navbar } from "../layout/Navbar";
import { Text } from "./text";

interface Props {
  children: ReactNode;
  title: string;
  current: keyof typeof navigation | "not-found";
}

export const Page: FC<Props> = ({ children, title, current }) => (
  <>
    <header>
      <Navbar
        items={Object.entries(navigation).map(([name, href]) => ({
          name,
          href,
        }))}
        current={current}
      />
    </header>
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-14">
        <Text variant="h1" color="black">
          {title}
        </Text>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full px-8 min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            {children}
          </main>
        </div>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  </>
);
