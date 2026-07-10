export interface DataTableCellContext<
  TRow = Record<string, unknown>,
  TValue = unknown,
> {
  $implicit: TValue;
  row: TRow;
  value: TValue;
  key: keyof TRow & string;
}

