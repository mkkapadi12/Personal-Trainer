import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useSelector } from 'react-redux';
import ArticleCardCarousel from '@/pages/Article/components/ArticleCardCarousel';
import { Loader2 } from 'lucide-react';

const ArticleCarousel = () => {
  const { articles, loading: articleLoading } = useSelector(
    (state) => state.article,
  );

  if (articleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <section className="bg-brand md:py-20 py-10">
      <div className="container max-w-292.5 mx-auto px-3">
        <div className="space-y-7">
          {/* title */}
          <div className="md:px-4 text-black text-center space-y-5">
            <h2 className="text-2xl md:text-4xl font-bold">
              INTERESTING ARTICLES
            </h2>
            <p className="max-w-125 mx-auto text-sm font-normal">
              As you move through various yoga postures (asanas), you will learn
              to synchronise your breath with your movements, creating a
              graceful and meditative flow.
            </p>
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
                {articles?.map((article) => (
                  <ArticleCardCarousel key={article._id} article={article} />
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

export default ArticleCarousel;
