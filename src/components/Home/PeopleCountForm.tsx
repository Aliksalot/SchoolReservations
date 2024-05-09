import style from './PeopleCountForm.module.css';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { POSSIBLE_RESERVATION_TIMES } from '../../constants';


export default function PeopleCountForm() {

  const [ showSubmitButton, setShowSubmitButton ] = useState(false);
  const [ peopleCount, setPeopleCount ] = useState(-1);
  const [ selectedTime, setSelectedTime ] = useState('');

  const handlePeopleCountInput = (event: ChangeEvent) => {
    const inputField = event.target as HTMLInputElement;
    if(!inputField) return;

    const input = parseInt(inputField.value);
    if(input <= 0){
      setShowSubmitButton(false)
      return;
    }

    setPeopleCount(input);
  }

  const handlePeopleCountSubmit = (event: FormEvent) => {
    event.preventDefault();
    if(peopleCount <= 0){
      return;
    }
    window.location.href=`/reserve/finish?count=${peopleCount}&time=${selectedTime}`;
  }

  const handleTimeSelect = (event: ChangeEvent) => {
    const selectField = event.target as HTMLSelectElement;
    const selectedTime = selectField.value;
    if(!selectedTime || !POSSIBLE_RESERVATION_TIMES.includes(selectedTime)){
      return;
    }
    setSelectedTime(selectedTime);

  }

  const toggleSubmitButtonShow = () => {
    if(peopleCount > 0 && !!selectedTime){
      setShowSubmitButton(true);
      return;
    }

    showSubmitButton && setShowSubmitButton(false);
  }
  useEffect(toggleSubmitButtonShow, [peopleCount, selectedTime]);

  return (
    <>
      <form
        className={style.form}
        onSubmit={handlePeopleCountSubmit}
      >
        <label
          htmlFor="people-count"
          className={style.peopleCountLabel}
        >
          How many people are coming?
        </label>
        <input onChange={handlePeopleCountInput} type='number' min="1" step="1" id='people-count' placeholder="Amount of people" className={style.peopleCountInput} />
        <select
          onChange={handleTimeSelect}
          className={style.timeSelect}
          defaultValue={'none'}
        >
          <option
            value={'none'}
            disabled
          >
            Time
          </option>
          {POSSIBLE_RESERVATION_TIMES.map((time, index) => (
            <option
              key={index}
              className={style.timeOption}
            >
              {time}
            </option>
          ))}
        </select>
        <button
          className={`${style.submitPeopleCountButton} ${showSubmitButton ? style.show : ''}`}
        >
          Search for table
        </button>
      </form>

    </>
  )
}
