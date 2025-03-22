export interface ColDef<T, V = any> {
  colId: string;
  field?: keyof T;
  headerName?: string;
  valueGetter?: (row: T) => V;
  valueFormatter?: (value: V) => string;
}
