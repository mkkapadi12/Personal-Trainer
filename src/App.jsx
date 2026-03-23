import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Error from './pages/Error';
import Login from './pages/Auth/Login';
import Profile from './pages/Auth/Profile';
import Address from './pages/Address/Address';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import SingleArticle from './pages/Article/SingleArticle';
import Articles from './pages/Article/Articles';
import Services from './pages/Services';
import BookAppointment from './pages/Appointment/BookAppointment';
import Appointments from './pages/Appointment/Appointments';
import Products from './pages/Products/Products';
import Collections from './pages/Products/Collections';
import ProductDetails from './pages/Products/ProductDetails';
import Cart from './pages/Cart/Cart';
import PrivateRoute from './pages/Private/PrivateRoute';
import WishList from './pages/WishList/WishList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'account',
        children: [
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'login',
            element: <Login />,
          },

          // ✅ Protected Routes Wrapper
          {
            element: <PrivateRoute />,
            children: [
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'profile/address',
                element: <Address />,
              },
              {
                path: 'appointment',
                element: <Appointments />,
              },
              {
                path: 'cart',
                element: <Cart />,
              },
              {
                path: 'wishlist',
                element: <WishList />,
              },
            ],
          },
        ],
      },
      {
        path: 'pages',
        children: [
          {
            path: 'about',
            element: <AboutUs />,
          },
          {
            path: 'contact',
            element: <Contact />,
          },
          {
            path: 'faqs',
            element: <Faqs />,
          },
          {
            path: 'services',
            element: <Services />,
          },
          {
            path: 'appointment',
            element: <BookAppointment />,
          },
        ],
      },
      {
        path: 'articles',
        children: [
          {
            path: '',
            element: <Articles />,
          },
          {
            path: ':id',
            element: <SingleArticle />,
          },
        ],
      },
      {
        path: 'products',
        element: <Collections />,
      },
      {
        path: 'products/collections/:category',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
