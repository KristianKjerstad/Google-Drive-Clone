import { useState } from 'react'
import { Signup } from './authentication/Signup'
import { Container } from "react-bootstrap"
import { AuthProvider } from '../contexts/AuthContext'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Profile } from './authentication/Profile';
import { Login } from './authentication/Login';
import { ForgotPassword } from './authentication/ForgotPassword';
import { UpdateProfile } from './authentication/UpdateProfile';

function App() {
  const router = createBrowserRouter([
    {
      path: "/user",
      element: <Profile />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/update-profile",
      element: <UpdateProfile />
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
