import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/icon.png';
import HospitalData from './Components/HospitalData';
import HospitalDetails from './Components/HospitalDetails';

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
        <Route path="/:name/details" element={<HospitalDetails />} />
      </Routes>
    </div>
  )
}

export default App
