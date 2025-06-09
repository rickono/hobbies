"use client";

import { BaseIngredient, Source, Unit } from "@rono/types";
import Fuse from "fuse.js";
import { createContext, useCallback, useContext, useMemo } from "react";

const IngredientContext = createContext<{
  ingredients: BaseIngredient[];
  sources: Source[];
  units: Unit[];
  ingredientSearch: Fuse<BaseIngredient>;
  unitSearch: Fuse<Unit>;
} | null>(null);

export const useIngredients = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useIngredients must be used within an IngredientProvider");
  }

  return context.ingredients;
};

export const useIngredientSearch = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error(
      "useIngredientSearch must be used within an IngredientProvider",
    );
  }

  return useCallback(
    (searchString: string, limit: number = 10) => {
      return context.ingredientSearch.search(searchString, { limit });
    },
    [context.ingredientSearch],
  );
};

export const useSources = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useSources must be used within an IngredientProvider");
  }

  return context.sources;
};

export const useUnits = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useUnits must be used within an IngredientProvider");
  }

  return context.units;
};

export const useUnitSearch = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useUnitSearch must be used within an IngredientProvider");
  }

  return useCallback(
    (searchString: string, limit: number = 10) => {
      return context.unitSearch.search(searchString, { limit });
    },
    [context.unitSearch],
  );
};

export const CookingProvider = ({
  ingredients,
  children,
  units,
  sources,
}: {
  ingredients: BaseIngredient[];
  children: React.ReactNode;
  units: Unit[];
  sources: Source[];
}) => {
  const ingredientSearch = useMemo(
    () => new Fuse(ingredients, { keys: ["name"], threshold: 0.3 }),
    [ingredients],
  );

  const unitSearch = useMemo(
    () => new Fuse(units, { keys: ["name", "abbreviation"], threshold: 0.3 }),
    [units],
  );

  return (
    <IngredientContext.Provider
      value={{ ingredients, ingredientSearch, unitSearch, units, sources }}
    >
      {children}
    </IngredientContext.Provider>
  );
};
