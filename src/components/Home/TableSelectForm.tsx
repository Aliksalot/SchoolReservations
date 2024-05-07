import {useParams} from "react-router-dom";
import style from './TableSelectForm.module.css';

export default function  TableSelectForm() {

  const { peopleCount } = useParams();

  return (
    <form
      className={style.form}
    >
      <p
        className={style.peopleCountP}
      >
        Looking for a table for <span>{peopleCount}</span>.
      </p>
      <label
        className={style.label}
      >
        Choose on of the table options we have calculated suit you!
      </label>
      <select
        className={style.select}
        defaultValue={'none'}
      >
        <option
          value={'none'}
          disabled={true}
        >Table Number</option>
      </select>
      <button
        className={style.submitButton}
      >Continue</button>
    </form>

  )
}
