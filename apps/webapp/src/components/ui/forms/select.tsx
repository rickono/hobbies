import {
  BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select-base";

interface Props {
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  value: string;
}

export const Select = ({
  onChange,
  placeholder = "Select an option",
  options,
  value,
}: Props) => {
  return (
    <BaseSelect onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </BaseSelect>
  );
};
