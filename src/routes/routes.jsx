import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/layout';
import Error from '../pages/Error';
import PrivateRoute from '../pages/Private/PrivateRoute';
import AddProducts from '@/pages/AddProducts';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Profile = lazy(() => import('../pages/Auth/Profile'));
const Address = lazy(() => import('../pages/Address/Address'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Contact = lazy(() => import('../pages/Contact'));
const Faqs = lazy(() => import('../pages/Faqs'));
const Services = lazy(() => import('../pages/Services'));
const BookAppointment = lazy(
  () => import('../pages/Appointment/BookAppointment'),
);
const Appointments = lazy(() => import('../pages/Appointment/Appointments'));
const Articles = lazy(() => import('../pages/Article/Articles'));
const SingleArticle = lazy(() => import('../pages/Article/SingleArticle'));
const Collections = lazy(() => import('../pages/Products/Collections'));
const Products = lazy(() => import('../pages/Products/Products'));
const ProductDetails = lazy(() => import('../pages/Products/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const WishList = lazy(() => import('../pages/WishList/WishList'));

// Private route children
const privateChildren = [
  { path: 'profile', element: <Profile /> },
  { path: 'profile/address', element: <Address /> },
  { path: 'appointment', element: <Appointments /> },
  { path: 'cart', element: <Cart /> },
  { path: 'wishlist', element: <WishList /> },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },

      {
        path: 'account',
        children: [
          { path: 'register', element: <Register /> },
          { path: 'login', element: <Login /> },
          { element: <PrivateRoute />, children: privateChildren },
        ],
      },

      {
        path: 'pages',
        children: [
          { path: 'about', element: <AboutUs /> },
          { path: 'contact', element: <Contact /> },
          { path: 'faqs', element: <Faqs /> },
          { path: 'services', element: <Services /> },
          { path: 'appointment', element: <BookAppointment /> },
          { path: 'addproduct', element: <AddProducts /> },
        ],
      },

      {
        path: 'articles',
        children: [
          { path: '', element: <Articles /> },
          { path: ':id', element: <SingleArticle /> },
        ],
      },

      { path: 'products', element: <Collections /> },
      { path: 'products/collections/:category', element: <Products /> },
      { path: 'products/:id', element: <ProductDetails /> },
    ],
  },
]);
