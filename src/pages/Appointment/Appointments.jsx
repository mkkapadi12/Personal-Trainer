import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentCard from './components/AppointmentCard';
import { getAllAppointmentsAsync } from '@/Store/features/appointment/appointment.slice';

const Appointments = () => {
  const { loading, appointment } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointmentsAsync());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:py-20 py-10">
      <section className="max-w-292.5 mx-auto px-3 container space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase">All Appointments</h1>
        </div>

        {appointment.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {appointment.map((appo) => {
              return <AppointmentCard key={appo?._id} appo={appo} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Appointments;
