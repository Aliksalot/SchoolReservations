import { Handler } from '@netlify/functions';
import { MongoClient, ObjectId } from 'mongodb';
import {Reservation} from '../../src/types/models';
import {freeTables} from '../../src/utils/reserve';

const client = new MongoClient(process.env.CONNECTION_URL || '');

const handler: Handler = async(event) => {
  if(event.httpMethod !== 'DELETE'){
    return {
      statusCode: 400
    }
  }
  const deleteAll = event.queryStringParameters?.all === 'true';
  const toDeleteName = event.queryStringParameters?.name || '';

  const db = (await client.connect()).db(process.env.DATABASE_NAME || '');
  const collection = db.collection<Reservation>(process.env.RESERVATIONS_COLLECTION || '');
  try{
    if(deleteAll){
      await collection.deleteMany();
      freeTables();
    }else{
      const tablesToClear = (await collection.findOneAndDelete({ name: toDeleteName }))?.tableOption.tableNumbers;
      console.log('executed');
      freeTables(tablesToClear);
    }
  } catch (error){
    console.log(error);
    return {
      statusCode: 400
    }
  }
  
  return {
    statusCode: 200
  }
}

export { handler }
