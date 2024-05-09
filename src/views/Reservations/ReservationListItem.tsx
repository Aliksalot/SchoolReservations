import style from './ReservationListItem.module.css';
import {useReservations} from './Reservations';

export default function  ReservationListItem(props: {
  tables: number[],
  at: string,
  by: string,
}) {

  const { deleteReservation } = useReservations();

  return (
    <li
      className={style.reservation}
    >
      <span
        className={style.time}
      >
        At: {props.at}
      </span>
      <span
        className={style.reservations}
      >
        Tables:
        <ul
          className={style.tablesList}
        >
          {props.tables.map( (table, index) => (
            <li
              className={style.tableNumber}
              key={index}
            >
              {`${table}${index >= props.tables.length - 1 ? '':','} `}
            </li>
          ))}
        </ul>
      </span>
      <span
        className={style.createdBy}
      >
        By: {props.by}
      </span>
      <button
        className={style.deleteButton}
        onClick={() => deleteReservation && deleteReservation(props.by, false)}
      >
        X
      </button>
    </li>
  )
}
