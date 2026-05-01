import '../styles/App.scss'
import { useState, type Dispatch, type SetStateAction } from 'react';
import Header from "../shared/components/header/Header.tsx";
import Footer from "../shared/components/footer/Footer.tsx";
import {Outlet} from "react-router-dom";

export type AppOutletContext = {
  isSimulationRunning: boolean
  setIsSimulationRunning: Dispatch<SetStateAction<boolean>>
}

function App() {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  return (
    <div className="wrapper">
      <Header isSimulationRunning={isSimulationRunning} />
      <main className="main-content">
        <Outlet context={{ isSimulationRunning, setIsSimulationRunning }} />
      </main>
      <Footer/>
    </div>
  )
}

export default App
