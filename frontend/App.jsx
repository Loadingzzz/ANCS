import "./index.css";
import Home from "./Components/Home/Home.jsx";
import Header from "./Components/Header/Header.jsx";
import Login from "./Pages/Login/Login.jsx";
import Registration from "./Pages/Registration/Registration.jsx";
import AddPost from "./Pages/AddPost/AddPost";

import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { FullPost } from "./Components/PostPage/FullPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserMe, selectorIsAuth } from "./redux/Slice/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  useEffect(() => {
    dispatch(fetchUserMe());
  }, []);
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/ANCS/" element={<Home />} />
          <Route path="/ANCS/login" element={<Login />} />
          <Route path="/ANCS/registration" element={<Registration />} />
          <Route path="/ANCS/posts/:id" element={<FullPost />} />
          <Route path="/ANCS/create" element={<AddPost />} />
          <Route path="/ANCS/posts/:id/edit" element={<AddPost />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
