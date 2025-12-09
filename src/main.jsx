import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './components/Home.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SIgnIn from './components/SIgnIn.jsx';
import SignUP from './components/SignUP.jsx';
import AuthProvider from './context/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: ()=> fetch('http://localhost:3000/coffees'),
        Component: Home
      },
      {
        path: "/add",
        Component: AddCoffee
      },
      {
        path: "/coffee/:id",
        loader: ({params}) => fetch(`http://localhost:3000/coffees/${params.id}`),
        Component: CoffeeDetails
      },
      {
        path: "/updateCoffee/:id",
        loader: ({params}) => fetch(`http://localhost:3000/coffees/${params.id}`),
        Component: UpdateCoffee
      },
      {
        path: 'signin',
        Component: SIgnIn
      }, 
      {
        path: 'signup',
        Component: SignUP
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
