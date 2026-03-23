import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { PAGE_ICONS } from '@/lib/icons/pageicons';

const AboutUs = () => {
  return (
    <div>
      <PageHero
        title="About us"
        description={`Welcome to our "About Us" page, where we are delighted to share the story and values that drive our organization.`}
        backLink="/"
        backText="Back to home"
      />
      <section className="py-10 md:py-20">
        <div className="mx-auto container max-w-292.5 px-3 space-y-6">
          <h1 className="uppercase text-4xl font-bold">Fitness Classes</h1>
          <div className="flex md:flex-row flex-col items-center justify-between gap-2 md:gap-6 text-sm font-medium w-full">
            <p>
              Our team of experienced fitness professionals is dedicated to
              creating a positive and empowering environment for individuals of
              all fitness levels. Whether you're a beginner taking your first
              steps towards fitness.
            </p>
            <p>
              What sets us apart is our holistic approach to fitness. We believe
              that true fitness is not just about physical strength but also
              encompasses mental and emotional well-being. That's why we offer a
              wide range of services that go beyond traditional workouts.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto container max-w-292.5 px-3 space-y-10">
          <h1 className="text-center uppercase text-2xl sm:text-3xl  md:text-4xl font-bold">
            We are here, for always help you.
          </h1>
          {/* 1 */}
          <div>
            <div className="flex md:flex-row flex-col items-center justify-center gap-10">
              <div className="w-full md:w-[50%] space-y-5">
                <h1 className="text-3xl font-bold uppercase">
                  Personal Training:
                </h1>
                <p className="text-sm font-medium">
                  We offer a diverse selection of fitness classes designed to
                  keep you engaged, motivated, and challenged. From
                  high-intensity interval training (HIIT) to yoga, pilates, and
                  dance-based workouts, our classes cater to different interests
                  and fitness levels. Our certified instructors will guide you
                  through each session, ensuring proper form and technique while
                  keeping the energy levels high.
                </p>
                <p className="text-sm font-medium">
                  If you prefer a more personalized approach, our dedicated
                  personal trainers are here to help. They will create a
                  customized workout plan tailored to your specific goals,
                  whether it's weight loss, strength training, or overall
                  fitness improvement. Our trainers will provide the expertise,
                  accountability, and motivation needed to maximize your results
                  and push past plateaus.
                </p>
              </div>
              <div className="w-full md:w-[50%]">
                <img
                  src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/abt-1.jpg?v=1684991224"
                  alt="poster 1"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* 2 */}
          <div>
            <div className="flex md:flex-row flex-col items-center justify-center gap-10">
              <div className="w-full md:w-[50%] md:order-1 order-2">
                <img
                  src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/abt-2.jpg?v=1684991224"
                  alt="poster 2"
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-[50%] space-y-5 md:order-2 order-1">
                <h1 className="text-3xl font-bold uppercase">
                  Nutrition Counselings:
                </h1>
                <p className="text-sm font-medium">
                  We believe that nutrition plays a crucial role in achieving
                  optimal fitness. Our nutrition experts will work with you to
                  develop a sustainable eating plan that suits your lifestyle
                  and supports your fitness goals. They will educate you on
                  proper nutrition, help you make healthier food choices, and
                  provide ongoing support and guidance to ensure long-term
                  success.
                </p>
                <p className="text-sm font-medium">
                  In addition to physical fitness, we recognize the importance
                  of mental and emotional well-being. That's why we offer
                  wellness workshops that focus on stress management,
                  mindfulness, and overall self-care. These workshops provide
                  valuable tools and strategies to help you find balance, reduce
                  stress, and enhance your overall quality of life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto max-w-292.5 px-3 space-y-6">
          <div className="text-center space-y-5">
            <h1 className="uppercase font-bold text-3xl md:text-4xl">
              About our services
            </h1>
            <p className="text-sm font-medium">
              Join our group fitness classes led by certified instructors who
              will guide you through various workouts. We offer a diverse range
              of classes including:
            </p>
          </div>
          <div className="flex items-center justify-between w-full gap-6 flex-wrap">
            <Card className="relative px-2 py-4 rounded-md w-full sm:w-[48%] md:w-[30%]">
              <CardContent className="space-y-2">
                <h1 className="text-xl font-bold">Fast delivery</h1>
                <p className="text-sm font-medium">
                  The specific delivery time will vary depending on the shipping
                  address and the selected delivery option. Customers can track
                  their order online to see the estimated delivery date.
                </p>
                <div className="absolute top-4 right-4">
                  <PAGE_ICONS.TRUCK />
                </div>
              </CardContent>
            </Card>
            <Card className="relative px-2 py-4 rounded-md w-full sm:w-[48%] md:w-[30%]">
              <CardContent className="space-y-2">
                <h1 className="text-xl font-bold">Many offers</h1>
                <p className="text-sm font-medium">
                  CMS also offers a variety of training to help providers and
                  state agencies meet their responsibilities under Medicare,
                  Medicaid, and SCHIP. These services include.
                </p>
                <div className="absolute top-4 right-4">
                  <PAGE_ICONS.OFFER />
                </div>
              </CardContent>
            </Card>
            <Card className="relative px-2 py-4 rounded-md w-full sm:w-[48%] md:w-[30%]">
              <CardContent className="space-y-2">
                <h1 className="text-xl font-bold">24/7 support</h1>
                <p className="text-sm font-medium">
                  CMS Service support is available 24 hours a day, 7 days a
                  week. You can reach them by phone, email, or chat. Here are
                  the contact information for CMS Service support.
                </p>
                <div className="absolute top-4 right-4">
                  <PAGE_ICONS.PHONE />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
