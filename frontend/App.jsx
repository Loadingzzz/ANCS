import { useState } from "react";
import "./index.css";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { Container } from "@mui/material";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import { Routes, Route } from "react-router-dom";
import PostPage from "./Components/PostPage/PostPage";

function App() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/ANCS/" element={<Home />} />
          <Route path="/ANCS/login" element={<Login />} />
          <Route path="/ANCS/registration" element={<Registration />} />
          <Route path="/ANCS/post:id" element={<PostPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
