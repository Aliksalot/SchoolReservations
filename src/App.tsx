import './App.css'
import './index.css'
import {Route, Routes, Navigate } from 'react-router-dom'
import { HomeProvider } from './views/Home/Home.tsx'

import Nav from './components/shared/Nav.tsx'
import Home from './views/Home/Home.tsx'
import Reservations, {ReservationsProvider} from './views/Reservations/Reservations.tsx'
function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path = '/reserve/*' element = {
            <HomeProvider>
              <Home />
            </HomeProvider>
          } />
          <Route path = '/reservations' element = { 
            <ReservationsProvider>
              <Reservations />
            </ReservationsProvider>
           } />
          <Route path = '*' element= {<Navigate to='/reserve' replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
