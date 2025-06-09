import { SourceSelect } from "app/cooking/components/SourceSelect";
import { FormField } from "components/ui/forms/form-field";
import { FormSection } from "components/ui/forms/form-layout";
import { Controller, useFormContext } from "react-hook-form";
import { RecipeFormData } from "../types";

export const AddRecipeSource = () => {
  const { control } = useFormContext<RecipeFormData>();

  return (
    <FormSection header="Source" description="Where is this recipe from?">
      <FormField
        name="source.sourceId"
        className="col-span-3"
        label="Source"
        labelProps={{ htmlFor: "source" }}
      >
        <Controller
          control={control}
          name="source.sourceId"
          render={({ field }) => (
            <SourceSelect
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </FormField>
    </FormSection>
  );
};
