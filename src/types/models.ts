export type TableOption = {
  tables: Table[],
  size: number,
}
export type Table = {
  _id?: string,
  tableNumber: number,
  taken: boolean,
  size: number
}
export type Reservation = {
  tableOption: TableOption,
  name: string,
  time: Date
}
