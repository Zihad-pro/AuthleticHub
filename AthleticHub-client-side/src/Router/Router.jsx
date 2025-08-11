import { createBrowserRouter } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Error from "../Components/Error";
import BookEvents from "../Pages/BookEvents/BookEvents";
import MyBooking from "../Pages/My Booking/MyBooking";
import MangeEvents from "../Pages/MangeEvents/MangeEvents";
import PrivateRoutes from "../Routes/PrivateRoutes";
import CreateEvents from "../Pages/CrateEvents/CreateEvents";
import Events from "../Pages/Events/Events";
import EventsDetails from "../Pages/EventsDetails/EventsDetails";
import Loading from "../Components/Loading";
import UpdateMangeEvents from "../Pages/UpdateMangeEvents/UpdateMangeEvents";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/bookevents",
        element: (
          <PrivateRoutes>
            <BookEvents></BookEvents>
          </PrivateRoutes>
        ),
      },
      {
        path: "/mybooking",
        element: (
          <PrivateRoutes>
            <MyBooking></MyBooking>
          </PrivateRoutes>
        ),
      },
      {
        path: "/manageevents",
        element: (
          <PrivateRoutes>
            <MangeEvents></MangeEvents>
          </PrivateRoutes>
        ),
      },
      {
        path: "/createevents",
        element: (
          <PrivateRoutes>
            <CreateEvents></CreateEvents>
          </PrivateRoutes>
        ),
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/events/:id",
        element: (
          <PrivateRoutes>
            <EventsDetails></EventsDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://athletichub-chi.vercel.app/events/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/updatemange/:id",
        element: <UpdateMangeEvents />,
        loader: ({ params }) =>
          fetch(`https://athletichub-chi.vercel.app/events/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
    ],
  },
  {
    path: "/*",
    Component: Error,
  },
]);
export default router;
