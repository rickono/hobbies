import { zodResolver } from "@hookform/resolvers/zod";
import { isSourceId, SourceId } from "@rono/types";
import { FormLayout } from "components/ui/forms/form-layout";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { RecipeFormData } from "../types";
import { AddRecipeDetails } from "./AddRecipeDetails";
import { AddRecipeParts } from "./AddRecipeParts";
import { AddRecipeSource } from "./AddRecipeSource";

interface Props {
  show: boolean;
  onSubmit: (data: RecipeFormData) => void;
}

const recipeFormSchema = z.object({
  source: z.object({
    sourceId: z.custom<SourceId>(isSourceId),
  }),
  recipe: z.object({
    name: z.string().min(1, "Name is required"),
    nativeName: z.string().optional(),
    description: z.string().optional(),
  }),
  parts: z
    .array(
      z.object({
        description: z.string().min(1, "Part description is required"),
        ingredients: z.string().min(1, "Ingredients are required"),
      }),
    )
    .min(1, "At least one part is required"),
});

export const InitialAdd = ({ show, onSubmit: externalOnSubmit }: Props) => {
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      source: { sourceId: "" },
      parts: [{ description: "", ingredients: "" }],
    },
  });

  const onSubmit: SubmitHandler<RecipeFormData> = (formData, e) => {
    e?.preventDefault();
    externalOnSubmit(formData);
  };

  if (!show) {
    return null;
  }

  return (
    <FormLayout form={form} onSubmit={onSubmit} okText="Review">
      <AddRecipeSource />
      <AddRecipeDetails />
      <AddRecipeParts />
    </FormLayout>
  );
};
