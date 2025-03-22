declare const processIdBrand: unique symbol;
export type ProcessId = number & {
  [processIdBrand]: "ProcessId";
};

export function ProcessId(id: number): ProcessId {
  return id as ProcessId;
}

ProcessId.NULL = ProcessId(0);
