import { Text } from "components/ui";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ReviewIngredient } from "./ReviewIngredient";
import { ParsedPart } from "./types";

export const ReviewIngredients = () => {
  const { control } = useFormContext<ParsedPart>();

  const { fields } = useFieldArray({
    name: "parts",
    control,
  });

  return (
    <>
      <Text variant="h4">Ingredients</Text>
      {fields.map((part, partIdx) => {
        return (
          <div key={part.id} className="my-3">
            <Text className="mb-4" variant="h4">
              {part.part}
            </Text>
            <div className="flex flex-col gap-2">
              {part.ingredients.map((ingredient, ingredientIdx) => {
                return (
                  <ReviewIngredient
                    ingredient={ingredient}
                    key={ingredient.rawText}
                    partIdx={partIdx}
                    ingredientIdx={ingredientIdx}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
