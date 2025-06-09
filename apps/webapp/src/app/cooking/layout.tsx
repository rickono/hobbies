import { dbClient } from "@rono/db";
import { ReactNode } from "react";
import { CookingProvider } from "./components/CookingProvider";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const ingredients = await dbClient.cooking.getAllIngredients();
  const units = await dbClient.cooking.getAllUnits();
  const sources = await dbClient.cooking.getAllSources();

  return (
    <CookingProvider sources={sources} ingredients={ingredients} units={units}>
      {children}
    </CookingProvider>
  );
}
