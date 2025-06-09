import { BaseIngredient } from "@rono/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface IngredientLinkProps {
  ingredient: BaseIngredient;
}

export const IngredientLink = ({ ingredient }: IngredientLinkProps) => {
  return (
    <Link href={`/cooking/ingredients/${ingredient.id}`}>
      <div className="rounded-md border px-4 py-2 text-sm flex justify-between items-center">
        {ingredient.name}
        <ChevronRight size="20" className="text-gray-400" />
      </div>
    </Link>
  );
};
