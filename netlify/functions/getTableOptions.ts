import { Handler } from '@netlify/functions';
import { Table } from '../../src/types/models';
import {getAvailableTables} from '../../src/utils/reserve';

const handler: Handler = async(event) => {
  
  try{
    var { count, time } = JSON.parse(event.body || '');
    count = parseInt(count);
    console.log(count, time);
  }catch{
    return{
      statusCode: 400
    }
  }
  if(!count || isNaN(count)){
    return{
      statusCode: 400
    }
  }
  let availableTables = (await getAvailableTables(time)).sort((a, b) => a.size - b.size);
  if(!availableTables || availableTables.length <=0){
    return {
      statusCode: 400
    }
  }
  let tables : Table[] = [];
  while(count > 0) {
    let addedTable = false;
    for(let i = 0; i < availableTables.length; i ++){
      const { size } = availableTables[i];
      if(size >= count){
        tables.push(availableTables[i]);
        count -= size;
        availableTables = availableTables.filter((table) => table._id !== availableTables[i]._id);
        addedTable = true;
        break;
      }
    }
    if(!addedTable){
      const table = availableTables.pop() as Table;
      tables.push(table);
      count -= table.size;
    }
  }

  console.log(tables);
  return {
    statusCode: 200,
    body: JSON.stringify(tables)
  }
}
export { handler }
