import { Separator } from "@radix-ui/react-separator";
import { InsertRecipe } from "@rono/db";
import {
  useIngredientSearch,
  useUnitSearch,
} from "app/cooking/components/CookingProvider";
import { Text } from "components/ui";
import { FormLayout } from "components/ui/forms/form-layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseIngredients } from "../parseIngredients";
import { RecipeFormData } from "../types";
import { ReviewIngredients } from "./ReviewIngredients";
import { ParsedPart } from "./types";

interface Props {
  initialRecipe: RecipeFormData;
  onCancel: () => void;
}

export const ReviewRecipe = ({ initialRecipe, onCancel }: Props) => {
  const searchIngredients = useIngredientSearch();
  const searchUnits = useUnitSearch();

  const form = useForm<ParsedPart>({
    defaultValues: {
      parts: initialRecipe.parts.map((part) => ({
        part: part.description,
        ingredients: parseIngredients(part.ingredients).map(
          ({
            quantity,
            unit,
            quantifier,
            ingredient,
            preparation,
            rawText,
          }) => {
            const unitSearchResult = unit ? searchUnits(unit)[0] : undefined;
            const ingredientSearchResult =
              (ingredient ?? rawText)
                ? searchIngredients(ingredient ?? rawText)[0]
                : undefined;

            return {
              quantity,
              unitId: unitSearchResult?.item.id,
              ingredientId: ingredientSearchResult?.item.id,
              quantifier,
              preparation,
              rawText,
            };
          },
        ),
      })),
    },
  });

  const onSubmit: SubmitHandler<ParsedPart> = async (formData, e) => {
    e?.preventDefault();
    const body: InsertRecipe = {
      name: initialRecipe.recipe.name,
      nativeName: initialRecipe.recipe.nativeName,
      description: initialRecipe.recipe.description,
      sourceId: initialRecipe.source.sourceId,
      parts: formData.parts.map((part) => ({
        description: part.part,
        ingredients: part.ingredients,
      })),
    };

    console.log(body);

    const id = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log(id);
  };

  return (
    <FormLayout form={form} onSubmit={onSubmit} onCancel={onCancel}>
      <Text variant="h4">Review</Text>
      <Separator className="my-3" />
      <div>
        <Text variant="h2">{initialRecipe.recipe.name}</Text>
        <Text italic>{initialRecipe.recipe.nativeName}</Text>
      </div>
      <Text className="my-4">{initialRecipe.recipe.description}</Text>
      <ReviewIngredients />
    </FormLayout>
  );
};
