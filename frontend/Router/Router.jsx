import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ANCS/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
