import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./auth/authProvider";

//pages
import SignIn from "./pages/sign";
import Profile from "./components/profile/profile";
import Reg from "./components/Registration/Registration";

import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/home/home";
import Plan from "./components/PlanPage/day";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Reg" element={<Reg />} />
            <Route path="/Plan" element={<Plan />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
