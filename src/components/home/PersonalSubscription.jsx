import { useForm } from 'react-hook-form';

const PersonalSubscription = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset();
  };

  return (
    <section className="bg-black text-white pt-10">
      <div className="max-w-292.5 mx-auto px-3 grid pb-10 lg:grid-cols-2 gap-12 items-start border-b border-white">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start justify-between gap-4">
          <p className="text-brand uppercase tracking-[6px] text-sm font-semibold">
            Best Online
          </p>

          <h2 className="text-4xl font-bold leading-tight">
            PERSONAL <br />
            SUBSCRIPTION
          </h2>

          <p className="text-base font-bold">
            Join now for <span className="text-brand">7 days FREE</span> trial
          </p>

          <p className="text-white text-sm font-normal max-w-md">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum.
          </p>

          <button className="bg-brand text-black px-5 py-2 font-semibold uppercase hover:bg-white transition">
            Read More
          </button>

          <div className="">
            <img
              src="https://personaltrainer-workdo.myshopify.com/cdn/shop/files/003.png?v=1686026748"
              alt="fitness"
              className="w-full"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="border border-brand p-4 sm:p-6 md:p-8 h-full">
          <h3 className="text-2xl font-semibold mb-6">Contact form:</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-white opacity-[0.6] text-sm mb-1 block">
                  First Name:
                </label>

                <input
                  {...register('firstName')}
                  placeholder="John"
                  className="w-full bg-black border border-gray-600 px-4 py-3 outline-none text-brand placeholder:text-white placeholder:opacity-[0.6]"
                />
              </div>

              <div>
                <label className="text-white opacity-[0.6] text-sm mb-1 block">
                  Last Name:
                </label>

                <input
                  {...register('lastName')}
                  placeholder="Dio"
                  className="w-full bg-black border border-gray-600 px-4 py-3 outline-none text-brand placeholder:text-white placeholder:opacity-[0.6]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-white opacity-[0.6] text-sm mb-1 block">
                  Contact:
                </label>

                <input
                  {...register('contact')}
                  placeholder="1234567890"
                  className="w-full bg-black border border-gray-600 px-4 py-3 outline-none text-brand placeholder:text-white placeholder:opacity-[0.6]"
                />
              </div>

              <div>
                <label className="text-white opacity-[0.6] text-sm mb-1 block">
                  E-mail:
                </label>

                <input
                  {...register('email')}
                  placeholder="shop@company.com"
                  className="w-full bg-black border border-gray-600 px-4 py-3 outline-none text-brand placeholder:text-white placeholder:opacity-[0.6]"
                />
              </div>
            </div>

            <div>
              <label className="text-white opacity-[0.6] text-sm mb-1 block">
                Description:
              </label>

              <textarea
                {...register('description')}
                placeholder="How can we help?"
                rows="5 text-brand placeholder:text-white placeholder:opacity-[0.6]"
                className="w-full bg-black border border-gray-600 px-4 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-brand text-black px-6 py-3 font-semibold uppercase hover:bg-white transition"
            >
              Get Consultations
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PersonalSubscription;
