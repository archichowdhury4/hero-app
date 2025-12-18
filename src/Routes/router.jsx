import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../pages/Root';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Apps from '../pages/Apps';

 export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index:true,
        path: "/",
        Component: Home
      },
        {
          path: "apps",
          Component: Apps
        },
    ]
  },
   {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);