import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

export interface SelectOption<T = any> {
  label: string;
  value: T;
}

interface Props<T> {
  className?: string;
  label: string;
  options: SelectOption<T>[];
  disabled?: boolean;
  placeholder?: string;
  onSelect: (option: SelectOption<T>) => void;
}

export function Select<T>({
  disabled = false,
  label,
  options,
  placeholder = "Select an option",
  onSelect,
  className = "",
}: Props<T>) {
  const [selected, setSelected] = useState<SelectOption<T> | null>(null);

  const handleSelect = (option: SelectOption<T>) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className={clsx("w-full", className)}>
      <Listbox value={selected} onChange={handleSelect} disabled={disabled}>
        <Label className="block text-sm/6 font-medium text-gray-900">
          {label}
        </Label>
        <div className="relative mt-2">
          <ListboxButton
            className={clsx(
              "grid w-full cursor-default grid-cols-1 rounded-md py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6",
              disabled ? "bg-gray-200" : "bg-white",
            )}
          >
            <span
              className={clsx(
                "col-start-1 row-start-1 truncate pr-6",
                selected?.label === undefined && "text-gray-400",
              )}
            >
              {selected?.label ?? placeholder}
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.label}
                value={option}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-primary data-focus:text-white data-focus:outline-hidden"
              >
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {option.label}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary group-not-data-selected:hidden group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
