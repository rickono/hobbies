import { FC, ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { Button } from "../button";

interface FormSection {
  header: string;
  description: string;
  children: ReactNode;
}

interface Props<T extends FieldValues> {
  children: ReactNode;
  onCancel?: () => void;
  onSubmit: (data: T) => void;
  okText?: string;
  cancelText?: string;
  form: UseFormReturn<T>;
}

export const FormSection: FC<FormSection> = ({
  header,
  description,
  children,
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">{header}</h2>
        <p className="mt-1 text-sm/6 text-gray-600">{description}</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        {children}
      </div>
    </div>
  );
};

export const FormLayout = <T extends FieldValues>({
  children,
  onSubmit,
  onCancel,
  okText = "Save",
  cancelText = "Cancel",
  form,
}: Props<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-12">{children}</div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button variant="secondary" type="button" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button>{okText}</Button>
        </div>
      </form>
    </FormProvider>
  );
};
