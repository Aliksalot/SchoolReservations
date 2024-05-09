import PeopleCountForm from "../../components/Home/PeopleCountForm";
import Loading from "../../components/shared/Loading";
import TableSelectForm from "../../components/Home/TableSelectForm";

import style from './Home.module.css';
import {Routes, Route} from "react-router-dom";
import {Context, createContext, useEffect} from "react";
import {useContext, useState} from "react";

const HomeContext = createContext<{
  showLoading?: boolean,
  setShowLoading?: any
}>({});

export const HomeProvider = ({ children }: {children: any}) => {
  const [ showLoading, setShowLoading ] = useState(false);

  return (
    <HomeContext.Provider value={{showLoading, setShowLoading}}>
      {children}
    </HomeContext.Provider>
  )
}
export const useHome = () => {
  const context = useContext(HomeContext);
  return context;
}

export default function Home(){

  const { showLoading } = useHome();
  
  useEffect(() => {
    if(window.location.search.includes('notify')){
      alert("Table reserved successfully! ")
    }
  }, []);
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
          <Route path='/finish' element = {<TableSelectForm />} />
        </Routes>
        <Loading show={showLoading || false} />
      </div>
  );
}
