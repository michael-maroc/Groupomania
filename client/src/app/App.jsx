import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "common/components/layout/Layout";
import Login from "features/auth/login/Login";
import Register from "features/auth/register/Register";
import RequireAuth from "common/hooks/RequireAuth";
import Posts from "features/posts/Posts";
import Navbar from "common/components/navBar/NavBar";
import "./App.css";
import Profile from "features/profile/Profile";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Posts />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        
      </Routes>
    </>
  );
};

export default App;
