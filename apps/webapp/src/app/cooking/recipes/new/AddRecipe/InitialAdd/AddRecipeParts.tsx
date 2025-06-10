import { Button } from "components/ui";
import { FormField } from "components/ui/forms/form-field";
import { FormSection } from "components/ui/forms/form-layout";
import { Textarea } from "components/ui/forms/textarea";
import { Input } from "components/ui/input";
import { Separator } from "components/ui/separator";
import { Plus, Trash } from "lucide-react";
import { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeFormData } from "../types";

export const AddRecipeParts = () => {
  const { control, register } = useFormContext<RecipeFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts",
  });

  return (
    <FormSection header="Parts" description="The different parts of the recipe">
      {fields.map((part, index) => (
        <Fragment key={part.id}>
          <div className="flex justify-between col-span-6 items-center">
            <div className="grid grid-cols-6 gap-4 items-start w-full">
              <FormField
                className="col-span-3"
                label="Name"
                name={`parts.${index}.description`}
              >
                <Input
                  id="part-name"
                  {...register(`parts.${index}.description`)}
                />
              </FormField>
              <FormField
                className="col-span-4"
                label="Ingredients"
                name={`parts.${index}.ingredients`}
              >
                <Textarea
                  id="ingredients"
                  {...register(`parts.${index}.ingredients`)}
                />
              </FormField>
            </div>
            <Button
              size="icon"
              variant="destructive"
              className="size-8"
              type="button"
              onClick={() => remove(index)}
            >
              <Trash />
            </Button>
          </div>

          {index < fields.length - 1 && <Separator className="col-span-6" />}
        </Fragment>
      ))}
      <div className="col-span-6 flex items-center justify-center">
        <Button
          size="icon"
          className="size-8"
          type="button"
          variant="secondary"
          onClick={() => append({ description: "", ingredients: "" })}
        >
          <Plus />
        </Button>
      </div>
    </FormSection>
  );
};
