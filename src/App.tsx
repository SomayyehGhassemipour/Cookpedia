import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/pages/HomePage';
import { SignInPage } from './components/pages/SignInPage';
import { CookingLevelPage } from './components/pages/signUp/CookingLevelPage';
import { CountryPage } from './components/pages/signUp/CountryPage';
import { CreateAccountPage } from './components/pages/signUp/CreateAccountPage';
import { PersonalDataPage } from './components/pages/signUp/PersonalDataPage';
import WelcomePage  from './components/pages/WelcomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/signup-country" element={<CountryPage/>}/>
        <Route path="/signup-cooking" element={<CookingLevelPage/>}/>
        <Route path="/signup-personal-data" element={<PersonalDataPage/>}/>
        <Route path="/signup-create-account" element={<CreateAccountPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
