import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import { Table, TableOption } from '../../src/types/models';

const client = new MongoClient(process.env.CONNECTION_URL || '');

const handler: Handler = async(event) => {
  const db = (await client.connect()).db(process.env.DATABASE_NAME || '');
  const collection = db.collection<Table>(process.env.TABLES_COLLECTION || '');
  let availableTables = (await collection.find({ taken: false }).toArray()).sort((a, b) => a.size - b.size);
  let target = 7;
  let tables : Table[] = [];
  availableTables.map((table) => console.log(table.size));
  while(target > 0) {
    let addedTable = false;
    for(let i = availableTables.length - 1; i >= 0; i --){
      const { size } = availableTables[i];
      if(size <= target){
        tables.push(availableTables[i]);
        availableTables = availableTables.filter((table) => table._id !== availableTables[i]._id);
        addedTable = true;
        target -= size;
        break;
      }
    }
    if(!addedTable && target > 0){
      for(let i = 0; i < availableTables.length; i ++){
        const { size } = availableTables[i];
        if(size >= target){
          tables.push(availableTables[i]);
          availableTables = availableTables.filter((table) => table._id !== availableTables[i]._id);
          addedTable = true;
          target -= size;
          break;
        }
      }
    }
  }
  console.log(tables);
  return {
    statusCode: 200,
  }
}
export { handler }
