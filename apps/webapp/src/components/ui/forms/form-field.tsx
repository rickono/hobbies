import { ErrorMessage } from "@hookform/error-message";
import { cn } from "lib/utils";
import { Label } from "../label";

interface Props {
  children: React.ReactNode;
  className?: string;
  labelProps?: React.ComponentProps<"label">;
  label: string;
  name: string;
}

export const FormField = ({
  children,
  labelProps,
  label,
  className,
  name,
}: Props) => {
  return (
    <div className={cn("grid w-full items-center", className)}>
      <Label htmlFor={name} {...labelProps} className="mb-3">
        {label}
      </Label>
      {children}
      <div className="min-h-[1.25rem]">
        <ErrorMessage
          name={name}
          render={({ message }) => (
            <p className="text-sm text-destructive">{message}</p>
          )}
        />
      </div>
    </div>
  );
};
