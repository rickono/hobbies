import { FormField } from "components/ui/forms/form-field";
import { FormSection } from "components/ui/forms/form-layout";
import { Textarea } from "components/ui/forms/textarea";
import { Input } from "components/ui/input";
import { useFormContext } from "react-hook-form";

export const AddRecipeDetails = () => {
  const { register } = useFormContext();

  return (
    <FormSection
      header="Recipe"
      description="High level information about the recipe"
    >
      <FormField className="col-span-3" label="Name" name="recipe.name">
        <Input id="name" {...register("recipe.name")} />
      </FormField>
      <FormField
        className="col-span-3"
        label="Native name"
        name="recipe.nativeName"
      >
        <Input id="native-name" {...register("recipe.nativeName")} />
      </FormField>
      <FormField
        className="col-span-6"
        label="Description"
        name="recipe.description"
      >
        <Textarea {...register("recipe.description")} />
      </FormField>
    </FormSection>
  );
};
