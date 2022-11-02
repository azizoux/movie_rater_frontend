import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Home from "./Pages/Home";
import NavBar from "./Components/NavBar/NavBar";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/movies" element={<Home />} />
        <Route exact path="/sign_up" element={<SignUp />} />
      </Routes>
    </div>
  );
}
