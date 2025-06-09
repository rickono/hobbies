import { Page } from "components/ui/page";
import { AddRecipe } from "./AddRecipe/AddRecipe";

const Recipes = () => {
  return (
    <Page title="Recipes" current="Cooking">
      <AddRecipe />
    </Page>
  );
};

export default Recipes;
