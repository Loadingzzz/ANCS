import "./index.css";
import Home from "./Components/Home/Home.jsx";
import Header from "./Components/Header/Header.jsx";
import Login from "./Pages/Login/Login.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import PostPage from "./Components/PostPage/PostPage.jsx";
import AddPost from "./Pages/AddPost/AddPost";

import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

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
          <Route path="/ANCS/create:id" element={<AddPost />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
