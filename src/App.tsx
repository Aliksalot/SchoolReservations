import './App.css'
import './index.css'
import {Route, Routes, Navigate } from 'react-router-dom'

import Nav from './components/shared/Nav.tsx'
import Home from './views/Home/Home.tsx'
function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path = '/reserve/*' element = {<Home />} />
          <Route path = '*' element= {<Navigate to='/reserve' replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
