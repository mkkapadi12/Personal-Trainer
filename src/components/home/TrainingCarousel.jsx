import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';
import { trainingPrograms } from '@/constants/home/data';
import { Button } from '@headlessui/react';
import Autoplay from 'embla-carousel-autoplay';

const TrainingCarousel = () => {
  return (
    <section className="-mt-60 pt-10">
      <div className="container max-w-292.5 mx-auto px-3">
        <div className="space-y-4">
          {/* title */}
          <div className="md:px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-start">
              PERSONAL TRAININGS
            </h2>
          </div>
          {/* Carousel Section */}
          <div className="md:px-4">
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
              className="w-full max-w-full mx-auto"
            >
              <CarouselContent className="relative">
                {trainingPrograms.map((program) => (
                  <CarouselItem
                    key={program.id}
                    className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Card className="rounded-none bg-black hover:border-amber-300 p-0 hover:border border-none">
                        <CardContent className="flex flex-col aspect-9/12 items-start justify-start p-0">
                          {/* image */}
                          <div className="w-full">
                            <Link to="/">
                              <img
                                src={program.image}
                                alt={program.title}
                                className="w-full"
                              />
                            </Link>
                          </div>
                          {/* details */}
                          <div className="p-4 border border-[#2d2d2d] space-y-3">
                            <p className="text-brand">{program.tag}</p>
                            <h3 className="text-xl font-bold text-white">
                              {program.title}
                            </h3>
                            <p className="text-white text-sm font-medium">
                              {program.description.slice(0, 120)}...
                            </p>
                            <div>
                              <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer text-sm font-semibold px-5 py-2">
                                Read More
                              </Button>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingCarousel;
