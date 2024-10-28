import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/icon.png';
import Hospitals from './Components/HospitalData';
import HospitalData from './Components/HospitalData';
function App() {  
  const navigate = useNavigate();
  return (
    <div>
      <Navbar className="bg-body-tertiary">
          <Navbar.Brand onClick={()=>navigate('/')}>
            <img
              alt=""
              src={logo}
              width="50"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            <h2>MedStart</h2>
          </Navbar.Brand>
      </Navbar>
      <Routes>
        <Route path='/' element={<HospitalData />} />
      </Routes>
    </div>
  )
}

export default App
