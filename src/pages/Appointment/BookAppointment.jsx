import SimilarSection from '@/components/home/SimilarSection';
import React from 'react';
import AppointmentForm from './components/AppointmentForm';

const BookAppointment = () => {
  return (
    <div>
      <section className="md:pt-20 pt-10 mb-5 pb-10 md:mb-20 bg-black">
        <div className="container mx-auto max-w-292.5 px-3">
          <div className="flex md:flex-row flex-col items-center justify-center md:justify-between gap-2">
            {/* 1 form */}
            <div className="w-full md:w-[50%]">
              <AppointmentForm />
            </div>
            {/* 2 images */}
            <div className="py-10 md:py-0">
              <img
                src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/app1.png?v=1685015083"
                alt="poster 1"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <SimilarSection style={'text-black'} />
    </div>
  );
};

export default BookAppointment;
