import { PAGE_ICONS } from '@/lib/icons/pageicons';
import React from 'react';
import { Link } from 'react-router-dom';

const PageHero = ({ title, backLink, backText, description }) => {
  return (
    <section className="pt-10 pb-[70px] bg-black">
      <div className="container max-w-292.5 mx-auto px-3">
        <div className="flex items-start flex-col justify-start gap-4 text-white w-full sm:w-[41%] lg:w-[58%]">
          <Link
            to={backLink}
            className="flex gap-3 items-center justify-center"
          >
            <div className="border p-2 w-8 h-8 flex items-center justify-center rounded-full">
              <PAGE_ICONS.ARROWLEFT className="w-full h-full" />
            </div>
            <span className="text-sm font-medium">{backText}</span>
          </Link>
          <div>
            <h1 className="text-2xl md:text-4xl uppercase font-bold">{title}</h1>
          </div>
          <div>
            <p className="text-sm font-normal md:max-w-140">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
