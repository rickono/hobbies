import { FC, ReactNode } from "react";

interface FormSection {
  header: string;
  description: string;
  children: ReactNode;
}

interface Props {
  children: ReactNode;
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

export const FormLayout: FC<Props> = ({ children }) => {
  return (
    <form>
      <div className="space-y-12">{children}</div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
