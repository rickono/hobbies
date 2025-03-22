import { FC, ReactNode } from "react";
import { Text } from "./text";

interface Props {
  children: ReactNode;
  title: string;
}

export const Page: FC<Props> = ({ children, title }) => (
  <div className="py-10">
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Text variant="h1" color="black">
          {title}
        </Text>
      </div>
    </header>
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full px-8 min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            {children}
          </main>
        </div>
      </div>
    </main>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
  </div>
);
