import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { CountryPage } from './components/pages/signUp/CountryPage';
import WelcomePage  from './components/pages/WelcomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/signup" element={<CountryPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
