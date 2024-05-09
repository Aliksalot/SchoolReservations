export type TableOption = {
  tableNumbers: number[],
  size: number,
}
export type Table = {
  _id?: string,
  tableNumber: number,
  takenAt: string[],
  size: number,
}
export type Reservation = {
  tableOption: TableOption,
  name: string,
  time: string
}
