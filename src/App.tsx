import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { CreateRecipe } from "./pages/CreateRecipe";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignInPage } from "./pages/SignInPage";
import { CookingLevelPage } from "./pages/signUp/CookingLevelPage";
import { CountryPage } from "./pages/signUp/CountryPage";
import { CreateAccountPage } from "./pages/signUp/CreateAccountPage";
import { PersonalDataPage } from "./pages/signUp/PersonalDataPage";
import WelcomePage from "./pages/WelcomePage";
import { UserAuthContextProvider } from "./sevices/firebase/AthenicationService";

function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup-country" element={<CountryPage />} />
          <Route path="/signup-cooking" element={<CookingLevelPage />} />
          <Route path="/signup-personal-data" element={<PersonalDataPage />} />
          <Route
            path="/signup-create-account"
            element={<CreateAccountPage />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
