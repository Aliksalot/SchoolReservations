import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import { Table } from '../../src/types/models';

const client = new MongoClient(process.env.CONNECTION_URL || '');

const allowedSizes = [4, 2, 8, 10, 12]

const randomSize = () => {
  return allowedSizes[Math.floor(Math.random() * allowedSizes.length)]
}
const handler: Handler = async(event) => {
  const db = (await client.connect()).db(process.env.DATABASE_NAME || '');
  const collection = db.collection<Table>(process.env.TABLES_COLLECTION || '');
  const tables: Table[] = [];
  for(let i = 0; i < 30; i++){
    tables.push({
      tableNumber: i + 1,
      taken: false,
      size: randomSize()
    })
  }
  await collection.insertMany(tables);
  return { statusCode: 200}
}
export { handler }
