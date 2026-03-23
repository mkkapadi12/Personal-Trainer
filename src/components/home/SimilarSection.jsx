import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';

const SimilarSection = ({ style }) => {
  return (
    <section className="space-y-10">
      <div className="px-4 md:pl-4 mb-10 ml-auto container max-w-7xl">
        <div className="flex md:flex-row flex-col gap-4 md:gap-0">
          {/* 1 */}
          <div className="w-full md:w-[41%] md:px-3 space-y-4 md:space-y-6 md:order-1 order-3">
            <h1 className={`uppercase text-2xl sm:text-4xl ${style} font-bold`}>
              POWER & STRENGHT
            </h1>
            <p className="text-base font-bold">
              Experienced cardio instructor provides instruction.
            </p>
            <p className="md:max-w-md text-sm font-normal">
              No matter your fitness level or goals, our cardio workouts are
              adaptable to suit your needs. Our trainers will provide
              modifications and progressions, ensuring that you can challenge
              yourself at the right intensity and progress at a pace that is
              comfortable for you.
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
          <div className="w-full md:w-[27%] md:px-3 order-2">
            <Card className="rounded-none bg-black p-0 border border-[#2d2d2d]">
              <CardContent className="flex flex-col md:aspect-9/12 items-start justify-start p-0">
                {/* image */}
                <div className="w-full">
                  <Link to="/">
                    <img
                      src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/002.png?v=1686026624"
                      alt="Similar 1"
                      className="w-full"
                    />
                  </Link>
                </div>
                {/* details */}
                <div className="p-4 space-y-3">
                  <p className="text-brand">Best Online</p>
                  <h3 className="text-xl font-bold text-white">
                    Kettlebell swings
                  </h3>
                  <p className="text-white text-sm font-medium">
                    In our yoga studio, you will find a sense of community and
                    support. We believe in creating a non-judgmental and
                    inclusive environment
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
          {/* 3 */}
          <div className="w-full md:w-[33%] md:pl-3 md:order-3 order-1">
            <div className="w-full md:h-[70%]">
              <video
                poster="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/001.png?v=1686026625"
                className="w-full h-full"
              >
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/27c7dce2018b46588a5a578d4a68dac1.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:pl-4 mb-10 mr-auto container max-w-7xl">
        <div className="flex md:flex-row flex-col gap-4 md:gap-0">
          {/* 1 */}
          <div className="w-full md:w-[33%] md:pl-3 order-1">
            <div className="w-full md:h-[70%]">
              <video
                poster="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/blog2.png?v=1684998045"
                className="w-full h-full ml-auto"
              >
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/27c7dce2018b46588a5a578d4a68dac1.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          {/* 2 */}
          <div className="w-full md:w-[27%] md:px-3 order-2">
            <Card className="rounded-none bg-black p-0 border border-[#2d2d2d]">
              <CardContent className="flex flex-col md:aspect-9/12 items-start justify-start p-0">
                {/* image */}
                <div className="w-full">
                  <Link to="/">
                    <img
                      src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/blog-img-2_f7a6f9d2-8e11-411a-a63e-c33916afd3f3.png?v=1684997976"
                      alt="Similar 1"
                      className="w-full"
                    />
                  </Link>
                </div>
                {/* details */}
                <div className="p-4 space-y-3">
                  <p className="text-brand">Best Online</p>
                  <h3 className="text-xl font-bold text-white">
                    Zumba dance routines
                  </h3>
                  <p className="text-white text-sm font-medium">
                    Studies have shown that regular exercise is associated with
                    a longer life expectancy and a reduced risk of premature
                    death.
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
          {/* 3 */}
          <div className="w-full md:w-[41%] md:px-3 space-y-4 md:space-y-6 order-3">
            <h1 className={`uppercase text-2xl sm:text-4xl ${style} font-bold`}>
              YOGA & PILATES
            </h1>
            <p className="text-base font-bold">Medicine ball exercises</p>
            <p className="md:max-w-md text-sm font-normal">
              Active individuals have a lower risk of developing chronic
              conditions such as type 2 diabetes, certain types of cancer, and
              metabolic syndrome.
            </p>
            <ul className="list-disc space-y-2 ml-5 text-sm font-medium">
              <li>Improved cardiovascular health.</li>
              <li>Enhanced flexibility and balance.</li>
              <li>Boosted mood and mental well-being.</li>
            </ul>
            <div>
              <Button className="bg-[#d7fb00] text-black hover:bg-white transition-colors duration-300 uppercase rounded-none cursor-pointer">
                read more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarSection;
