import { dbClient } from "@rono/db";
import { IngredientId } from "@rono/types";
import { Text } from "components/ui";
import { Card } from "components/ui/card";
import { Page } from "components/ui/page";
import { notFound } from "next/navigation";
import { IngredientLink } from "../components";
import { AddIngredient } from "./AddIngredient";

interface Props {
  params: Promise<{ id: string }>;
}

const Ingredients = async ({ params }: Props) => {
  const { id } = await params;

  const ingredientId = IngredientId(Number(id));
  if (isNaN(ingredientId)) {
    notFound();
  }

  const ingredient = await dbClient.cooking.getIngredient(ingredientId);

  if (ingredient === undefined) {
    notFound();
  }

  return (
    <Page title="Ingredients" current="Cooking">
      <Card>
        <Text className="capitalize" variant="h3">
          {ingredient.name}
        </Text>
        <div className="mt-2 flex flex-col gap-2 max-w-64">
          <Text variant="h5">Subcategories</Text>
          {ingredient.children.map((child) => (
            <IngredientLink ingredient={child} key={child.id} />
          ))}
        </div>
        <AddIngredient pageIngredientId={ingredientId} />
      </Card>
    </Page>
  );
};

export default Ingredients;
