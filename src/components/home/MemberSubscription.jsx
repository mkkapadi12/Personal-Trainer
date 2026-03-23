import React from 'react';
import { Button } from '../ui/button';
import { membershipPlans } from '@/constants/home/data';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';

const MemberSubscription = ({ title }) => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20"
      style={{
        backgroundImage: `url('https://personaltrainer-workdo.myshopify.com/cdn/shop/files/subs-banner.png?v=1684920307')`,
      }}
    >
      <div className="container px-3 mx-auto max-w-292.5">
        <div className="flex gap-7 md:gap-0 md:flex-row flex-col items-center justify-start">
          {/* details */}
          <div className="w-full lg:w-1/2 md:px-4">
            <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-base text-white mb-8 font-semibold">
              Join now for 7 days <span className="text-brand">FREE</span> trial
            </p>
            <p className="text-sm text-white max-w-107.5 mb-8 font-medium">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less.
            </p>
            {/* buttons */}
            <div className="flex md:flex-row flex-col items-start md:items-center justify-start gap-4">
              <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer">
                read more
              </Button>
            </div>
          </div>

          {/* cards*/}
          <div className="flex sm:flex-row flex-col w-full lg:w-1/2 gap-4 items-center justify-between md:px-4">
            {membershipPlans.map((plan) => {
              return (
                <Card
                  key={plan.id}
                  className="rounded-none bg-black hover:border-amber-300 p-0 hover:border border border-[#2d2d2d]"
                >
                  <CardContent className="relative flex flex-col aspect-9/11 items-start justify-start p-0">
                    {/* image */}
                    <div className="w-full">
                      <Link to="/" className="w-full">
                        <img
                          src={plan.image}
                          alt={plan?.title}
                          className="w-full"
                        />
                      </Link>
                    </div>
                    {/* details */}
                    <div className="p-4 space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        {plan?.title}
                      </h3>
                      <p className="text-white text-sm font-normal">
                        {plan?.description}
                      </p>
                      <div className="flex text-white justify-between w-full items-center">
                        <div>
                          <h1 className="font-semibold text-lg">
                            ${plan.price}
                          </h1>
                        </div>
                        <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer text-sm font-semibold px-5 py-2">
                          Read More
                        </Button>
                      </div>
                    </div>

                    {plan.tag && (
                      <div className="absolute top-0 left-0 w-full bg-brand p-1">
                        <h1 className="text-sm font-bold text-black text-start">
                          {plan.tag}
                        </h1>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberSubscription;
