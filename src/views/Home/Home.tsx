import { useEffect, useRef, useState } from "react";
import { ChangeEvent } from "react";
import PeopleCountForm from "../../components/Home/PeopleCountForm";
import TableSelectForm from "../../components/Home/TableSelectForm";

import style from './Home.module.css';
import {Routes, Route} from "react-router-dom";

export default function Home(){


  return (
    <div
      className={style.content}
    >
      <h1
        className={style.heading}
      >
        Create a reservation
      </h1>
      <Routes>
        <Route path='/' element = {<PeopleCountForm />} />
        <Route path='/:peopleCount' element = {<TableSelectForm />} />
      </Routes>
    </div>
  );
}
