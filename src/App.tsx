import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import { SignInPage } from "./pages/SignInPage";
import { CookingLevelPage } from "./pages/signUp/CookingLevelPage";
import { CountryPage } from "./pages/signUp/CountryPage";
import { CreateAccountPage } from "./pages/signUp/CreateAccountPage";
import { PersonalDataPage } from "./pages/signUp/PersonalDataPage";
import WelcomePage from "./pages/WelcomePage";
import { UserAuthContextProvider } from "./sevices/firebase/AthenicationService";
import { User } from "./components/wrapper/User";

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="signup-country" element={<CountryPage />} />
          <Route path="signup-cooking" element={<CookingLevelPage />} />
          <Route path="signup-personal-data" element={<PersonalDataPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup-create-account" element={<CreateAccountPage />} />
          <Route path="user/*" element={<User />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
