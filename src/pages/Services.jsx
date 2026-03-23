import MemberSubscription from '@/components/home/MemberSubscription';
import PersonalSubscription from '@/components/home/PersonalSubscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TESTIMONIALS } from '@/constants/home/data';
import { PAGE_ICONS } from '@/lib/icons/pageicons';
import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="bg-black">
      <section className="md:py-20 py-10">
        <div className="container mx-auto max-w-292.5 px-3 space-y-5">
          {/* Back to services */}
          <div className="text-white text-left inline-block md:px-3">
            <Link to="/" className="flex gap-3 items-center justify-center">
              <div className="border p-2 w-8 h-8 flex items-center justify-center rounded-full">
                <PAGE_ICONS.ARROWLEFT className="w-full h-full" />
              </div>
              <span className="text-sm font-medium">Back to services</span>
            </Link>
          </div>
          {/* Service flex */}
          <div className="flex md:flex-row flex-col gap-5 md:gap-0 items-center justify-between">
            {/* 1 */}
            <div className="w-full md:w-[41%] md:px-3 space-y-4 md:space-y-6 text-white">
              <h1 className="uppercase text-2xl sm:text-4xl text-white font-bold">
                POWER & STRENGHT
              </h1>
              <p className="text-base font-bold">
                Join now for{' '}
                <span className="text-brand uppercase">7 days</span> FREE trial
              </p>
              <p className="md:max-w-md text-sm font-normal">
                Join us today and embark on a transformative fitness journey.
                Whether you're looking to lose weight, build strength, improve
                flexibility, or simply lead a healthier lifestyle, we are here
                to support you every step of the way.
              </p>
              <ul className="list-disc space-y-2 ml-5 text-sm font-medium">
                <li>Lose unnecessary kilograms.</li>
                <li>Increase endurance and strength.</li>
                <li>Gain new energy and willingness to train.</li>
              </ul>
              <div>
                <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer">
                  read more
                </Button>
              </div>
            </div>
            {/* 2 */}
            <div className="w-full md:w-[58%] md:px-3">
              <div className="w-full">
                <img
                  src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/service.png?v=1685011397"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="z-2 overflow-x-hidden">
        <Carousel
          plugins={[
            Autoplay({
              delay: 1500,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="relative md:-ml-16!">
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-100 px-3"
              >
                <div className="p-1">
                  <Card className="rounded-none bg-black border p-0 border-brand">
                    <CardContent className="flex sm:aspect-9/12 flex-col items-start justify-start p-0">
                      {/* image */}
                      <div className="w-full">
                        <Link to="/">
                          <img
                            src={testimonial.image}
                            alt={testimonial.title}
                            className="w-full"
                          />
                        </Link>
                      </div>
                      {/* details */}
                      <div className="p-4 space-y-3">
                        <div className="flex gap-3 items-center">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                              return index < Math.round(testimonial.rating) ? (
                                <Star
                                  key={index}
                                  className="w-5 h-5 text-brand fill-brand"
                                />
                              ) : (
                                <Star
                                  key={index}
                                  className="w-5 h-5 text-white fill-white"
                                />
                              );
                            })}
                          </div>
                          <p className="text-brand text-lg">
                            {testimonial.rating}
                          </p>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {testimonial.title}
                        </h3>
                        <p className="text-white text-sm font-medium">
                          {testimonial.description.slice(0, 90)}...
                        </p>
                        <div className="flex items-center gap-3 text-white">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            <img
                              src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/john.png?v=1684925339"
                              alt={testimonial.name}
                              className="w-full h-full"
                            />
                          </div>
                          <div>
                            <p className="inline-block">{testimonial.name},</p>
                            <p className="inline-block ml-2">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-[50%] bg-white text-black" />
          <CarouselNext className="absolute right-2 top-[50%] bg-white text-black" />
        </Carousel>
      </section>

      {/* PERSONAL TRAINER SUBSCRIPTION */}
      <MemberSubscription title={'PERSONAL TRAINER SUBSCRIPTION'} />

      {/* Personal Subscription */}
      <PersonalSubscription />
    </div>
  );
};

export default Services;
