import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { getProfile } from '@/Store/features/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { fetchAddresses } from '@/Store/features/address/address.slice';
import { getallArticles } from '@/Store/features/article/article.slice';
import { getAllAppointmentsAsync } from '@/Store/features/appointment/appointment.slice';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallArticles());
    const token = localStorage.getItem('workDo');
    if (token) {
      dispatch(getProfile());
      dispatch(fetchAddresses());
      dispatch(getAllAppointmentsAsync());
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
