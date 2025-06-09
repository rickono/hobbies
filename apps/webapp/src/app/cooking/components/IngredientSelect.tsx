import { IngredientId } from "@rono/types";
import { Button } from "components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { cn } from "lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useIngredients } from "./CookingProvider";

interface Props {
  value: IngredientId;
  onChange: (value: IngredientId) => void;
}

export const IngredientSelect = ({ value, onChange }: Props) => {
  const ingredients = useIngredients();
  const ingredientNameToId = useMemo(
    () =>
      ingredients.reduce<Record<string, IngredientId>>(
        (acc, ingredient) => ({
          ...acc,
          [ingredient.name]: ingredient.id,
        }),
        {},
      ),
    [ingredients],
  );

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? ingredients.find((ingredient) => ingredient.id === value)?.name
            : "Select ingredient"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ingredient..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient.id}
                  value={ingredient.name}
                  onSelect={(name) => {
                    const id = ingredientNameToId[name] ?? IngredientId.NULL;
                    onChange(id);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ingredient.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {ingredient.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
