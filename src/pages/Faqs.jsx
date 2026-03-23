import PageHero from '@/components/PageHero';
import React from 'react';
import FaqAccordion from './components/FaqAccordation';
import { faqData } from '@/constants/data/faq';

const Faqs = () => {
  return (
    <div>
      <PageHero
        title="Faq's"
        description={`By subscribing, you become part of a vibrant community of like-minded individuals who share your passion.`}
        backLink="/"
        backText="Back to home"
      />
      <section className="py-10 sm:py-20">
        <div className="container max-w-292.5 mx-auto px-3 space-y-5">
          <div className="">
            <h1 className="text-4xl uppercase font-bold">About Shop</h1>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {faqData.map((faq) => (
                <FaqAccordion
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  value={faq.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faqs;
