import React, { useRef } from 'react';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '@/constants/home/data';
import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';

const Litigations = () => {
  return (
    <div className="">
      <section
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://personaltrainer-workdo.myshopify.com/cdn/shop/files/subs-banner-2.png?v=1684922221")`,
        }}
      >
        <div className="py-10 md:p-[40px_0_160px] relative w-full">
          <div className="container mx-auto max-w-292.5 px-3">
            <div className="relative text-right text-black z-2">
              <div className="text-right w-full space-y-5 ">
                <h2 className="uppercase md:max-w-107.5 text-3xl md:text-[42px] leading-tight! font-bold ml-auto">
                  Medicalerrors litigations
                </h2>
                <p className="font-bold text-base md:text-lg">
                  HIIT (High-Intensity Interval Training) workouts
                </p>
                <p className="md:max-w-107.5 ml-auto text-sm">
                  Embrace the camaraderie and support of our cardio workout
                  community. You'll have the opportunity to connect with fellow
                  enthusiasts who share your passion for pushing boundaries and
                  achieving personal milestones.
                </p>
                <div className="flex sm:flex-row flex-col items-start md:items-center justify-end gap-4">
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
        </div>
      </section>
      <section className="relative z-2 md:-mt-20 overflow-x-hidden py-10 md:pb-20">
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
    </div>
  );
};

export default Litigations;
