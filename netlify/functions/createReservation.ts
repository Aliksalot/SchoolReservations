import {Handler} from "@netlify/functions";
import { MongoClient } from 'mongodb';
import {Reservation, Table} from "../../src/types/models";
import { POSSIBLE_RESERVATION_TIMES } from '../../src/constants';
import {areAvailable, timeToNumber} from "../../src/utils/reserve";

const client = new MongoClient(process.env.CONNECTION_URL || '');

const handler: Handler = async(event) => {
  const body = JSON.parse(event.body || '');
  const reservationRequest = body as {name: string, tables: Table[], time: string, count: number};
  await client.connect();
  const db = client.db(process.env.DATABASE_NAME);
  const areTablesAvailable = await areAvailable(reservationRequest.tables, reservationRequest.time);
  if(!areTablesAvailable)
    return {
      statusCode: 400
    }
  const rCollection = db.collection<Reservation>(process.env.RESERVATIONS_COLLECTION || '');
  await rCollection.insertOne({
    tableOption: {
      tableNumbers: reservationRequest.tables.map(table => table.tableNumber),
      size: reservationRequest.count
    },
    name: reservationRequest.name,
    time: reservationRequest.time
  })
  const tCollection = db.collection<Table>(process.env.TABLES_COLLECTION || '');
  const reservedTimes = POSSIBLE_RESERVATION_TIMES.slice(timeToNumber(reservationRequest.time), timeToNumber(reservationRequest.time) + 6);
  console.log(reservedTimes);
  await tCollection.updateMany({
    tableNumber: {
      $in: reservationRequest.tables.map(table => table.tableNumber)
    }
  }, {
    $push: {
      takenAt: {
        $each: reservedTimes
      }
    }
  })
  return {
    statusCode: 200
  }
}
export { handler }
