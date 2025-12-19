import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../pages/Root';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Apps from '../pages/Apps';
import AppDetails from '../pages/Appdetails';
import InstallationPage from '../pages/InstallationPage';

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
        {
        path: "apps/:id",
        Component: AppDetails
      },
       {
          path: "installation",
          Component: InstallationPage
        }
    ]
  },
   {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);