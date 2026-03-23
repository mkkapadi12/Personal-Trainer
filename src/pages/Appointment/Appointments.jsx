import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentCard from './components/AppointmentCard';
import { getAllAppointmentsAsync } from '@/Store/features/appointment/appointment.slice';
import { PAGE_ICONS } from '@/lib/icons/pageicons';

const { CALENDAR_CHECK, CLIPBOARD } = PAGE_ICONS;

const Appointments = () => {
  const { loading, appointment } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointmentsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: '#d7fb00', borderTopColor: 'transparent' }}
          />
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <section className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div
              className="p-4 rounded-full"
              style={{
                background: 'rgba(215,251,0,0.08)',
                border: '1px solid rgba(215,251,0,0.2)',
              }}
            >
              <CALENDAR_CHECK size={28} style={{ color: '#d7fb00' }} />
            </div>
          </div>
          <h1
            className="text-4xl font-black tracking-widest uppercase mb-2"
            style={{ color: '#d7fb00' }}
          >
            Appointments
          </h1>
          <div
            className="h-0.5 w-16 mx-auto rounded-full mb-3"
            style={{ background: '#d7fb00' }}
          />
          <p className="text-gray-400 text-sm">
            {appointment.length > 0
              ? `${appointment.length} appointment${appointment.length !== 1 ? 's' : ''} scheduled`
              : 'No upcoming appointments'}
          </p>
        </div>

        {/* Empty State */}
        {appointment.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed rgba(215,251,0,0.2)',
            }}
          >
            <div
              className="p-5 rounded-full mb-4"
              style={{ background: 'rgba(215,251,0,0.07)' }}
            >
              <CLIPBOARD size={32} style={{ color: '#d7fb00', opacity: 0.5 }} />
            </div>
            <p className="text-gray-400 text-sm font-medium">
              No appointments found
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Appointments you book will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {appointment.map((appo) => (
              <AppointmentCard key={appo?._id} appo={appo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Appointments;
