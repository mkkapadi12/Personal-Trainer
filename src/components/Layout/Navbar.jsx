import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/images/logo/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CalendarDays, LogOut, MapPin, User } from 'lucide-react';
import { logout } from '@/Store/features/auth/auth.slice';
import { PAGE_ICONS } from '@/lib/icons/pageicons';
import CartDrawer from '@/pages/Cart/components/CartDrawer';

const navigation = {
  categories: [
    {
      id: 'collections',
      name: 'Collections',
      featured: [
        {
          name: 'Cross Trainer',
          href: '#',
          imageSrc:
            'https://personaltrainer-workdo.myshopify.com/cdn/shop/files/woman-working-out-gym.jpg?v=1739525393',
          imageAlt: 'cross trainer',
        },
        {
          name: 'Gym Equipment',
          href: '#',
          imageSrc:
            'https://personaltrainer-workdo.myshopify.com/cdn/shop/files/kettlebell-fitness-still-life.jpg?v=1739525416',
          imageAlt: 'gym equipment',
        },
        {
          name: 'Protien Poweder',
          href: '#',
          imageSrc:
            'https://personaltrainer-workdo.myshopify.com/cdn/shop/files/flat-lay-protein-powder-supplement-pills-weights-yellow-background.jpg?v=1739525534',
          imageAlt: 'protien poweder',
        },
        {
          name: 'Tredmills',
          href: '#',
          imageSrc:
            'https://personaltrainer-workdo.myshopify.com/cdn/shop/files/hightech-treadmill-modern-welllit-gym-environment.jpg?v=1739525557',
          imageAlt: 'tredmills',
        },
      ],
    },
  ],
  pages: [
    { name: 'Plans', href: '#' },
    { name: 'Pages', href: '/pages/about' },
    { name: 'Blog', href: '/articles' },
    { name: 'Products', href: '/products' },
  ],
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-black text-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="flex px-4 text-start mb-2">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="border-b-2 border-transparent uppercase text-base font-medium whitespace-nowrap text-white data-selected:border-white data-selected:text-white"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {category.featured.map((item) => (
                        <div
                          key={item.name}
                          className="group relative text-sm space-y-2"
                        >
                          <Link
                            to={`/products/collections/${item.name.toLowerCase()}`}
                            onClick={() => setOpen(false)}
                          >
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                            />
                          </Link>
                          <Link
                            to={`/products/collections/${item.name.toLowerCase()}`}
                            onClick={() => setOpen(false)}
                            className="block font-medium text-white"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.href}
                    className="-m-2 block p-2 font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {user ? (
                <div className="flow-root">
                  <Link
                    to="/account/profile"
                    className="-m-2 block p-2 font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="flow-root">
                    <Link
                      to="/account/login"
                      className="-m-2 block p-2 font-medium text-white"
                      onClick={() => setOpen(false)}
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/account/register"
                      className="-m-2 block p-2 font-medium text-white"
                      onClick={() => setOpen(false)}
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-white">
                  CAD
                </span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-black border-b border-white">
        <p className="h-10 items-center sm:flex hidden justify-center bg-[#d7fb00] px-4 text-sm font-medium text-black sm:px-6 lg:px-8">
          10% Discount On The First Order In Dietary!
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src={logo} className="h-8 w-auto" />
                </Link>
              </div>

              {/* Collections */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="group relative flex text-sm font-normal items-center justify-center text-white uppercase data-open:text-lime-400">
                          {category.name}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-lime-400"
                          />
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-20 w-full text-smtransition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-0 shadow-sm"
                        />
                        <div className="relative bg-black h-[280px] text-white">
                          <div className="max-w-7xl mx-auto lg:px-8 container h-full">
                            <div className="grid grid-cols-4 gap-x-4 h-full">
                              {category.featured.map((item) => (
                                <div
                                  key={item.name}
                                  className="group relative text-sm h-full"
                                >
                                  <Link
                                    to={`/products/collections/${item.imageAlt}`}
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="h-[70%] w-full bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                  </Link>

                                  <Link
                                    to={`/products/collections/${item.imageAlt}`}
                                    className="py-3 block font-normal uppercase text-sm text-white text-center"
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-normal text-white uppercase"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center justify-between gap-2">
                {user ? (
                  <div className="flex items-center gap-2 lg:items-center lg:gap-4">
                    {/* Avatar Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                          <Avatar className="size-8  md:size-9 cursor-pointer">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>
                              {user?.firstName?.charAt(0)}
                              {user?.lastName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-56 bg-black text-white border-none"
                      >
                        {/* Profile */}
                        <DropdownMenuItem asChild>
                          <Link
                            to="/account/profile"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <User size={16} />
                            Profile
                          </Link>
                        </DropdownMenuItem>

                        {/* Appointment */}
                        <DropdownMenuItem asChild>
                          <Link
                            to="/account/appointment"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <CalendarDays size={16} />
                            Appointment
                          </Link>
                        </DropdownMenuItem>

                        {/* Address */}
                        <DropdownMenuItem asChild>
                          <Link
                            to="/account/wishlist"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <PAGE_ICONS.HEART size={16} />
                            Wishlist
                          </Link>
                        </DropdownMenuItem>

                        {/* Cart */}
                        <DropdownMenuItem asChild>
                          <Link
                            to="/account/cart"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <ShoppingBagIcon size={16} />
                            Cart
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Logout */}
                        <DropdownMenuItem
                          onClick={() => {
                            dispatch(logout());
                            navigate('/account/login');
                          }}
                          className="flex items-center gap-2 cursor-pointer text-red-500"
                        >
                          <LogOut size={16} />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/account/login"
                      className="text-sm font-medium text-white"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" />
                    <Link
                      to="/account/register"
                      className="text-sm font-medium text-white"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                {/* Currency */}
                <div className="hidden lg:ml-8 lg:flex">
                  <Link to="/" className="flex items-center text-white">
                    <img
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="w-5"
                    />
                    <span className="ml-3 text-sm font-medium">CAD</span>
                  </Link>
                </div>

                {/* Book Button */}
                <div className="hidden sm:flex lg:ml-6">
                  <Link
                    to="/pages/appointment"
                    className="text-sm px-5 py-2 uppercase font-medium text-black bg-[#d7fb00]"
                  >
                    Book Here
                  </Link>
                </div>

                {/* Cart */}
                <div className="flow-root lg:ml-6">
                  <CartDrawer />
                </div>
                <div className="lg:hidden flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative text-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <PAGE_ICONS.BAR aria-hidden="true" className="size-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
