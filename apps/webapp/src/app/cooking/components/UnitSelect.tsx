import { UnitId } from "@rono/types";
import {
  BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/forms/select-base";
import { useUnits } from "./CookingProvider";

export interface Props {
  onChange?: (value: UnitId) => void;
  value?: UnitId;
}

export const UnitSelect = ({ onChange, value }: Props) => {
  const units = useUnits();

  return (
    <BaseSelect
      onValueChange={(idStr) => onChange?.(UnitId(Number(idStr)))}
      value={value?.toString() ?? ""}
    >
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        {units.map((unit) => (
          <SelectItem key={unit.id} value={unit.id.toString()}>
            {unit.name}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
};
