import './App.css'
import {Route, Routes, Navigate } from 'react-router-dom'
import Comp from './Comp'

function App() {
  return (
    <>
      <Routes>
        <Route path = '*' element = {<Navigate to = '/asd' replace={true}/>}/>
        <Route path = '/asd' element = {<Comp />} />
      </Routes>
    </>
  )
}

export default App
