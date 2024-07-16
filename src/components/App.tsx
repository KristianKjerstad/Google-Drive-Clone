import { useState } from 'react'
import { Signup } from './Signup'
import { Container } from "react-bootstrap"
import { AuthProvider } from '../contexts/AuthContext'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from './Dashboard';
import { Login } from './Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
  ]);

  return (
    <>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </div>
      </Container>
    </>
  )
}

export default App
