import style from './PeopleCountForm.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';


export default function PeopleCountForm() {

  const [ showSubmitButton, setShowSubmitButton ] = useState(false);
  const [ peopleCount, setPeopleCount ] = useState(-1);

  const handlePeopleCountInput = (event: ChangeEvent) => {
    const inputField = event.target as HTMLInputElement;
    if(!inputField) return;

    const input = parseInt(inputField.value);
    if(input <= 0){
      setShowSubmitButton(false)
      return;
    }

    setPeopleCount(input);
    setShowSubmitButton(true);
  }

  const handlePeopleCountSubmit = (event: FormEvent) => {
    event.preventDefault();
    if(peopleCount <= 0){
      return;
    }
    window.location.href=`/reserve/${peopleCount}`;
  }

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
        <button
          className={`${style.submitPeopleCountButton} ${showSubmitButton ? style.show : ''}`}
        >
          Search for table
        </button>
      </form>

    </>
  )
}
