import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import RequireAuth from "./features/auth/RequireAuth";
import AddPostForm from "./features/posts/addPostForm/AddPostForm";
import PostsList from "./features/posts/postsList.jsx/PostsList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="home" element={<PostsList />} />
          <Route path="add-post" element={<AddPostForm />} />
        </Route>
      </Route>
      {/* End of protected Routes */}
    </Routes>
  );
};

export default App;
