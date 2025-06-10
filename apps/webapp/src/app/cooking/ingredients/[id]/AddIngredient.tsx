"use client";

import { IngredientId } from "@rono/types";
import { IngredientSelect } from "app/cooking/components/IngredientSelect";
import { Button, Dialog, Text } from "components/ui";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { cn } from "lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  pageIngredientId: IngredientId;
}

const insertIngredient = async (
  ingredient: string,
  categoryId: IngredientId,
): Promise<IngredientId> => {
  const response = await fetch("/api/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: ingredient, categoryId }),
  });

  const id = await response.json();
  console.log(id);
  return id;
};

export const AddIngredient = ({ pageIngredientId }: Props) => {
  const [ingredient, setIngredient] = useState<string>("");
  const [categoryId, setCategoryId] = useState<IngredientId>(pageIngredientId);

  return (
    <div className="flex items-center gap-2 mt-4">
      <Dialog
        title="New Ingredient"
        trigger={
          <Button size="icon" variant="secondary">
            <Plus />
          </Button>
        }
        className="flex flex-col gap-4"
        onOk={() => insertIngredient(ingredient, categoryId)}
      >
        <div className={cn("grid w-full items-center")}>
          <Label className="mb-3">Ingredient</Label>
          <Input
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>
        <div className={cn("grid w-full items-center")}>
          <Label className="mb-3">Category</Label>
          <IngredientSelect value={categoryId} onChange={setCategoryId} />
        </div>
      </Dialog>
      <Text className="text-sm">Add ingredient</Text>
    </div>
  );
};
