import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./features/posts/home/Home";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import RequireAuth from "./features/auth/RequireAuth";
import AddPostForm from "./features/posts/addPostForm/AddPostForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="home" element={<Home />} />
        <Route path="add-post" element={<AddPostForm />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
