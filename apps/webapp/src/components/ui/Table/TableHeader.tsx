import clsx from "clsx";
import { ColDef } from "./types";

interface Props<T = any> {
  columns: ColDef<T>[];
}
export function TableHeader<T>({ columns }: Props<T>) {
  const getPaddingX = (idx: number): string => {
    if (idx === 0) {
      return "pl-4 pr-3 sm:pl-6 lg:pl-8";
    }
    if (idx === columns.length - 1) {
      return "pr-4 sm:pr-6 lg:pr-8";
    } else return "px-3";
  };

  const getHeaderName = (colDef: ColDef<T>): string => {
    if (colDef.headerName) {
      return colDef.headerName;
    }
    return colDef.field?.toString() ?? colDef.colId;
  };

  return (
    <thead className="">
      <tr className="px-0.5 sm:px-2.5 lg:px-4">
        {columns.map((col, idx) => (
          <th
            scope="col"
            className={clsx(
              "py-3.5 text-left text-sm font-semibold text-gray-900",
              getPaddingX(idx),
            )}
            key={col.colId}
          >
            {getHeaderName(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
