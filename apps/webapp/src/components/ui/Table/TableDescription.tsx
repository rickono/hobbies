import { FC } from "react";

interface Props {
  title: string;
  descriptor?: string;
}
export const TableDescription: FC<Props> = ({ title, descriptor }) => {
  return (
    <div className="sm:flex sm:items-centerpt-4 pb-8 px-6 pt-6">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold text-gray-900">{title}</h1>
        <p className="pt-2 text-sm text-gray-700">{descriptor}</p>
      </div>
      <div className="pt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </button>
      </div>
    </div>
  );
};
