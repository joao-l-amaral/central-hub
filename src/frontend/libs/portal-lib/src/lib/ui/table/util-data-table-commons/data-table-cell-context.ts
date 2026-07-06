export interface DataTableCellContext<
  TRow extends Record<string, unknown> = Record<string, unknown>,
  TValue = unknown,
> {
  $implicit: TValue;
  row: TRow;
  value: TValue;
  key: keyof TRow & string;
}
