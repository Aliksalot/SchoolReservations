import {useContext, useEffect, useState} from 'react';
import ReservationListItem from './ReservationListItem';
import style from './Reservations.module.css';
import {Reservation} from '../../types/models';
import Loading from '../../components/shared/Loading';
import {createContext} from 'react';

const ReservationsContext = createContext<{
  deleteReservation?: (id: string, all: boolean) => void;
}>({})

export const ReservationsProvider = ({ children }: {children: any}) => {
  //TODO
  const deleteReservation = (name: string, all: boolean) => {
    const url = `/.netlify/functions/deleteReservation?name=${name}&all=${all}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(() => {
      alert("Deleted successfully! ")
      window.location.reload();
    })
  }

  return (
    <ReservationsContext.Provider value={{deleteReservation}}>
      {children}
    </ReservationsContext.Provider>
  )
}

export const useReservations = () => useContext(ReservationsContext);

export default function  Reservations() {

  const [ loading, setLoading ] = useState(true);
  const [ reservations, setReservations ] = useState<Reservation[]>([]);
  const { deleteReservation } = useReservations();

  //TODO
  const fetchReservations = () => {
    const url = `/.netlify/functions/getReservations`
    fetch(url, {
      method: 'PUT'
    })
    .then(result => result.json())
    .then((data) => {
      setReservations(data);
      setLoading(false);
    })
    setLoading(true);
  }

  useEffect(fetchReservations, [])
  
  return (
    <>
      <header
        className={style.header}
      >
        <h1
          className={style.h1}
        >
          Reservations
        </h1>
        <button
          className={style.deleteAll}
          onClick={() => deleteReservation && deleteReservation('', true)}
        >
          Delete all reservations
        </button>
      </header>
      <ul
        className={style.reservationsList}
      >
        {reservations.map( (reservation, index) => (
          <ReservationListItem
            at={reservation.time}
            by={reservation.name}
            tables={reservation.tableOption.tableNumbers}
            key={index}
          />
        ))}
      </ul>
      <Loading show={loading} />
    </>

  )
}
