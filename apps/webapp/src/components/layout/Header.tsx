"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import { Text } from "../ui";
import { navigation } from "./constants";

export const Header: FC = () => {
  const path = usePathname();

  console.log(path);
  const headerTitle =
    Object.entries(navigation).find(([header, p]) => path === p)?.[0] ??
    "Not found";
  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Text variant="h1" color="black">
          {headerTitle}
        </Text>
      </div>
    </header>
  );
};
