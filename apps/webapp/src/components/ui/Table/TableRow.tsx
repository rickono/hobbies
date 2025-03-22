import clsx from "clsx";
import { FC } from "react";
import { ColDef } from "./types";

interface Props<T = any> {
  columns: ColDef<T>[];
  row: T;
}

const getDisplayValue = <T,>(row: T, column: ColDef<T>): string => {
  let value: any;
  if (column.valueGetter) {
    value = column.valueGetter(row);
  } else if (column.field) {
    value = row[column.field];
  }

  if (column.valueFormatter) {
    return column.valueFormatter(value);
  }
  return value;
};

export const TableRow: FC<Props> = ({ columns, row }) => {
  const getPaddingX = (idx: number): string => {
    if (idx === 0) {
      return "pl-4 pr-3 sm:pl-6 lg:pl-8";
    }
    if (idx === columns.length - 1) {
      return "pr-4 sm:pr-6 lg:pr-8";
    } else return "px-3";
  };
  return (
    <tr>
      {columns.map((column, idx) => (
        <td
          className={clsx(
            getPaddingX(idx),
            "py-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8",
          )}
          key={column.colId}
        >
          {getDisplayValue(row, column)}
        </td>
      ))}
    </tr>
  );
};
