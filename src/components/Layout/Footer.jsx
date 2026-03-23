import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { footerLinks } from '@/constants/footer/footerLinks';
import payment_methods from '@/assets/images/pay_copyright-01.png';

const Footer = () => {
  return (
    <div>
      <main>
        <div className="bg-black py-8">
          <section className="container max-w-293 px-3 mx-auto">
            <div className="sm:p-[40px_15px_20px] space-y-6">
              {/* grid section */}
              <div className="flex flex-wrap justify-between">
                {/* 1 */}
                <div className="text-white space-y-6 mt-10 md:mt-0 md:max-w-90 flex-[0_0_100%] max-w-full md:flex-[0_0_360px] order-4 md:order-1">
                  <p className="text-brand tracking-[0.5rem] font-semibold text-sm">
                    BEST ONLINE
                  </p>
                  <h1 className="text-4xl font-semibold">
                    PERSONAL SUBSCRIPTION
                  </h1>
                  <div className="space-y-4">
                    <p className="font-semibold text-base">
                      Join now for 7 days{' '}
                      <span className="text-brand">FREE</span> trial
                    </p>
                    <div className="flex w-full">
                      <Input
                        type="email"
                        id="email"
                        className="bg-black border rounded-none  border-gray-600 text-white placeholder:text-white focus:ring-brand! focus:border-brand! focus:ring-1 focus:ring-offset-0 focus:ring-offset-black! focus-visible:ring-brand! focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-offset-black! w-full"
                        placeholder="Enter email here..."
                      />
                      <Button className="bg-brand text-black rounded-none hover:bg-brand/90">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
                {/* 2 */}

                {footerLinks.map((item, index) => (
                  <div
                    key={index}
                    className="text-white md:pl-10 flex-[0_0_100%] mt-10 sm:mt-0 sm:flex-1 space-y-3 order-1 md:order-2"
                  >
                    <p className="text-brand font-semibold text-lg">
                      {item.label}:
                    </p>
                    <div>
                      <ul className="space-y-1">
                        {item.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              to={link.href}
                              className="text-white hover:underline text-sm duration-300"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* copyright section */}
              <div className="text-white flex items-center flex-wrap justify-between gap-5">
                <p>© 2026, Personaltrainer WorkDo, Powered by WorkDo.io</p>
                <div className="max-w-[60%] sm:max-w-[25%]">
                  <img src={payment_methods} alt="payment methods" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Footer;
