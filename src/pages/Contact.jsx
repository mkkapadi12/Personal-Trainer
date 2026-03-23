import PageHero from '@/components/PageHero';
import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';

const Contact = () => {
  return (
    <div>
      <PageHero
        title="Contact us"
        description={`Don't miss out on the latest news, trends, and insights in [your industry/field]. Subscribe now to stay up to date and be the first to know about what's happening.`}
        backLink="/"
        backText="Back to home"
      />
      <section className="py-10 md:py-20">
        <div className="container  mx-auto max-w-292.5 px-3">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start justify-between">
            {/* 1 */}
            <div className="w-full md:w-[41.5%] px-0 sm:px-3 md:pr-3">
              <div className="flex sm:flex-row flex-col gap-4 md:gap-10">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h1 className="uppercase font-bold text-base">Call Us</h1>
                    <Link className="text-lg font-medium" to="tel:+4800213212">
                      +48 0021-32-12
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <h1 className="uppercase font-bold text-base">Email:</h1>
                    <Link
                      className="text-lg font-medium"
                      to="mailto:shop@company.com"
                    >
                      shop@company.com
                    </Link>
                  </div>
                </div>
                <div className="space-y-5 sm:px-4">
                  <h1 className="uppercase font-bold text-base">Address</h1>
                  <div>
                    <p className="text-base font-medium">1093 Marigold Lane,</p>
                    <p className="text-base font-medium">Coral Way, Miami,</p>
                    <p className="text-base font-medium">Florida, 33169</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="sm:px-3 w-full md:w-[58%] md:-mt-[270px]">
              <div className="space-y-5">
                <h1 className="text-3xl md:text-4xl text-black md:text-white font-bold uppercase">
                  Contact Form
                </h1>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19055.62348025083!2d-6.275361925253291!3d53.34409869152512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b9e1777e3%3A0xf0c386e79dfddfc0!2s1-2%20Adam%20Court%2C%20Sr%C3%A1id%20Grafton%2C%20Dublin%202%2C%20D02%20W0Y7%2C%20Ireland!5e0!3m2!1sen!2sin!4v1773308062157!5m2!1sen!2sin"
            className="w-full h-[400px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
