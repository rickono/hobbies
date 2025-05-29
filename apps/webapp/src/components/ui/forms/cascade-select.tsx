import clsx from "clsx";
import { FC, useState } from "react";
import { Select, SelectOption } from "./select";

interface CascadeStep {
  label: string;
  options: SelectOption[];
}

interface Props {
  steps: CascadeStep[];
  onChange?: (selectedOptions: SelectOption[]) => void;
  selectClassName?: string;
}

export const CascadeSelect: FC<Props> = ({
  selectClassName = "",
  steps,
  onChange,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  return steps.map((step, idx) => {
    return (
      <Select
        className={clsx(selectClassName)}
        label={step.label}
        options={step.options}
        key={step.label}
        disabled={currentStep < idx}
        onSelect={(option) => {
          const newSelectedOptions = [...selectedOptions];
          newSelectedOptions[idx] = option;
          setSelectedOptions(newSelectedOptions);
          setCurrentStep(idx + 1);
          onChange?.(newSelectedOptions);
        }}
      />
    );
  });
};
