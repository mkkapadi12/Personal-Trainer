import React from 'react';
import { Button } from '../ui/button';

const HeroSection = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat p-[110px_0_240px] md:p-[240px_0_300px]"
      style={{
        backgroundImage: `url('https://personaltrainer-workdo.myshopify.com/cdn/shop/files/home-banner.png?v=1684912209')`,
      }}
    >
      <div className="container px-3 mx-auto max-w-292.5">
        <div className="flex items-center justify-start">
          <div className="w-full lg:w-1/2 md:px-4">
            <p className="text-brand tracking-[0.3rem] font-semibold text-sm">
              BEST ONLINE
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              PERSONAL SUBSCRIPTION
            </h1>
            <p className="text-base text-white mb-8 font-semibold">
              No matter your fitness level or goals
            </p>
            <p className="text-sm text-white max-w-107.5 mb-8 font-normal">
              Welcome to the world of personalized fitness guidance and
              motivation! Our personal trainer theme is designed to empower and
              inspire individuals to reach their fitness goals, regardless of
              their current fitness level.
            </p>
            {/* buttons */}
            <div className="flex md:flex-row flex-col items-start md:items-center justify-start gap-4">
              <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer">
                read more
              </Button>
              <Button className="bg-[#4949494f] text-white hover:text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer">
                watch trial training
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
