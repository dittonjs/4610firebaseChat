import { Children, useLayoutEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/layout';
import { Login } from './pages/login';
import { Chat } from './pages/chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/chat',
        element: <Chat />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
