import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { CookingLevelPage } from './components/pages/signUp/CookingLevelPage';
import { CountryPage } from './components/pages/signUp/CountryPage';
import WelcomePage  from './components/pages/WelcomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/signup-country" element={<CountryPage/>}/>
        <Route path="/signup-cooking" element={<CookingLevelPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
