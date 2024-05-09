import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import {Reservation} from '../../src/types/models';

const client = new MongoClient(process.env.CONNECTION_URL || '');

const handler: Handler = async(event) => {

  const db = (await client.connect()).db(process.env.DATABASE_NAME || '');
  const collection = db.collection<Reservation>(process.env.RESERVATIONS_COLLECTION || '');
  const reservations = await collection.find().toArray();
  console.log(reservations)
  
  return {
    statusCode: 200,
    body: JSON.stringify(reservations)
  }
}

export { handler }
