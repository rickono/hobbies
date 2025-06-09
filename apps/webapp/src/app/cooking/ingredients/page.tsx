import { dbClient } from "@rono/db";
import { Card } from "components/ui/card";
import { Page } from "components/ui/page";
import { IngredientLink } from "./components";

const Ingredients = async () => {
  const roots = await dbClient.cooking.getRootIngredients();
  console.log(roots);

  return (
    <Page title="Ingredients" current="Cooking">
      <Card>
        <div className="mt-2 flex flex-col gap-2 max-w-64">
          {roots.map((root) => (
            <IngredientLink key={root.id} ingredient={root} />
          ))}
        </div>
      </Card>
    </Page>
  );
};

export default Ingredients;
