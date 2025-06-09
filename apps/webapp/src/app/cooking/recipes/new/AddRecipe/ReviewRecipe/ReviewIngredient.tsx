import { IngredientId } from "@rono/types";
import { IngredientSelect } from "app/cooking/components/IngredientSelect";
import { UnitSelect } from "app/cooking/components/UnitSelect";
import { Text } from "components/ui";
import { Input } from "components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { FormIngredient } from "../types";
import { ParsedPart } from "./types";

interface Props {
  ingredient: FormIngredient;
  partIdx: number;
  ingredientIdx: number;
}

export const ReviewIngredient = ({
  ingredient,
  partIdx,
  ingredientIdx,
}: Props) => {
  const { register } = useFormContext<ParsedPart>();

  return (
    <div
      className="flex gap-2"
      key={`${ingredient.rawText}-${partIdx}-${ingredientIdx}`}
    >
      <Input
        className="w-16"
        {...register(`parts.${partIdx}.ingredients.${ingredientIdx}.quantity`)}
      />
      <Controller
        name={`parts.${partIdx}.ingredients.${ingredientIdx}.unitId`}
        render={({ field }) => (
          <UnitSelect
            value={field.value}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        name={`parts.${partIdx}.ingredients.${ingredientIdx}.ingredientId`}
        render={({ field }) => (
          <IngredientSelect
            value={field.value as IngredientId}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      <Text className="flex-1">{ingredient.rawText}</Text>
    </div>
  );
};
