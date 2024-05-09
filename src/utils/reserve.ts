import { Table, TableOption, Reservation } from '../types/models';
import { POSSIBLE_RESERVATION_TIMES } from '../constants';
import { MongoClient, WithId } from 'mongodb';

const client = new MongoClient(process.env.CONNECTION_URL || '');

export const timeToNumber = (time: string) : number => {
  return POSSIBLE_RESERVATION_TIMES.indexOf(time);
}
export const areAvailable = async( tables: Table[], time: string ) : Promise<boolean> => {
  await client.connect();
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection<Table>(process.env.TABLES_COLLECTION || '');
  const tableNumbers = tables.map( (table) => table.tableNumber );
  const tablesFromDb = await collection.find({ number: { $in: tableNumbers}}).toArray();
  for(const table of tablesFromDb){
    if(table.takenAt.includes(time)){
      return false;
    }
  }
  return true;
}   
export const getAvailableTables = async(time: string) : Promise<WithId<Table>[]>=> {
  await client.connect();
  const db = client.db(process.env.DATABASE_NAME);
  const collection = db.collection<Table>(process.env.TABLES_COLLECTION || '');
  let tables = await collection.find().toArray();
  const times = POSSIBLE_RESERVATION_TIMES.slice(timeToNumber(time), timeToNumber(time) + 6);
  tables = tables.filter( (table) => {
    for(const takenAt of times){
      if(table.takenAt.includes(takenAt)){
        return false;
      }
    }
    return true;
  })
  return tables;
}

