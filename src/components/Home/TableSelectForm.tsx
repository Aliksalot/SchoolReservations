import { useSearchParams } from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import style from './TableSelectForm.module.css';
import { Table } from "../../types/models";
import {useHome} from "../../views/Home/Home";

export default function  TableSelectForm() {

  const { setShowLoading } = useHome();
  const [ searchParams ] = useSearchParams(); 

  const count = parseInt(searchParams.get('count') || '');
  const time = searchParams.get('time')

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [ tables, setTables ] = useState<Table[]>([]);
  const [ showNameInput, setShowNameInput ] = useState(false);
  const [ name, setName ] = useState('');
  const [ loading, setLoading ] = useState(true);

  const fetchTableChoice = () => {
    console.log('fetching table choice');
    const url = `/.netlify/functions/getTableOptions`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        time, count
      })
    }).then(response => {
      if(response.ok)
        return response.json();
    }).then(data => {
      console.log(data);
      const tables = data as Table[];
      if(tables && tables.length > 0){
        setTables(tables);
      }
      setLoading(false);
    })
  }
  const makeReservation = () => {
    const url = `/.netlify/functions/createReservation`;
    setShowLoading(true);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, tables, time, count })
    }).then(() => window.location.href = '/reserve?notify')
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    makeReservation();
  }
  const handleNameInput = (event: ChangeEvent) => {
    const nameInputField = event.target as HTMLInputElement;
    const name = nameInputField.value;
    setName(name);
  }
  const handleNameInputShown = () => {
    if(showNameInput){
      nameInputRef.current && nameInputRef.current.focus();
    }
  }

  useEffect(fetchTableChoice, []);
  useEffect(handleNameInputShown, [showNameInput]);

  return (
    <div
      className={style.form}
    >
      <p
        className={style.count}
      >
        Looking for a table for <span>{count}</span> at <span>{time}</span> o'clock.
      </p>
      {!loading && tables && tables.length > 0 ?
        <>
          <label
            className={style.label}
          >
            You are going to be reserving tables:
          </label>
          <ul
            className={style.tablesList}
          >
            {tables.map( (table, index) => (
              <li
                className={style.tableItem}
                key={index}
              >
                <span
                  className={style.tableNumber}
                >
                  Table: {table.tableNumber}
                </span>
                <span
                  className={style.tableSize}
                >
                  Size: {table.size}
                </span>
              </li>
            ))}
          </ul>
        </>
        :
        loading && <span
          className={style.noTablesText}
        >
          We can't fit yall at this time. Please go back and choose a different time. 
        </span>
      }
      { showNameInput ? 
        <form
          className={style.nameInputForm}
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="nameInput"
            className={style.nameInputLabel}
          >
            Who do we reserve this table for?
          </label>
          <input
            ref={nameInputRef}
            onChange={handleNameInput}
            className={style.nameInputField}
            placeholder="Please enter your name"
          />
          <button
            className={style.submitButton}
            style={{
              display: name ? 'block' : 'none'
            }}
          >
            Make reservation
          </button>
        </form>
      :
        <></>
      }
      <div
        className={style.buttonsContainer}
        style={{
          display: showNameInput ? 'none': 'flex'
        }}
      >
        <button
          className={style.submitButton}
          style={{
            display: !loading && tables.length > 0 ? 'block' : 'none'
          }}
          onClick={() => {
            setShowNameInput(true)
          }}
        >Continue</button>
        <button
          className={style.submitButton}
          onClick={() => {
            window.location.href='/'
          }}
        >Back</button>
      </div>
    </div>

  )
}
