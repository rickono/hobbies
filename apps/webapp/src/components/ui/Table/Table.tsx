import { isDefined } from "@rono/utils";
import { ReactNode } from "react";
import { TableDescription } from "./TableDescription";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { ColDef } from "./types";

interface Props<T> {
  description?: {
    title: string;
    descriptor?: string;
  };
  rows: T[];
  columns: ColDef<T>[];
  getRowId: (row: T) => string;
}

export function Table<T>({
  description,
  columns,
  rows,
  getRowId,
}: Props<T>): ReactNode {
  return (
    <div className="w-full bg-white rounded-md border-solid border-1 border-gray-200">
      {isDefined(description) && <TableDescription {...description} />}
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHeader columns={columns} />
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.map((row) => (
                  <TableRow key={getRowId(row)} columns={columns} row={row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TableFooter />
    </div>
  );
}
