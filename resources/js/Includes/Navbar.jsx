import ApplicationLogo from '@/Components/ApplicationLogo';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link } from '@inertiajs/react';
import {useState} from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import {getCartContents} from "@/helper.js"
import {getLikeContents} from "@/ProductLike.js";

export default function Navbar({ auth }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [cartLength, setCartLength] = useState(getCartContents().length)
    const [likeLength, setLikeLength] = useState(getLikeContents().length)

    window.addEventListener('cartChange', function(event) {
        setCartLength(getCartContents().length)
    });

    window.addEventListener('likeChange', function(event) {
        setLikeLength(getLikeContents().length)
    });

    return (
        <nav
            className="py-6 bg-white sticky top-0 w-full backdrop-blur flex-none transition-colors duration-500 ease-in-out z-30">
            <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8 xl:px-12 overflow-x-hidden">
                <div
                    className="sm:mx-1 grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 items-center justify-center xl:justify-between">
                    <div className="col-span-1">
                        <div className="flex sm:gap-2">
                            <div className="flex items-center lg:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-8 sm:h-10 w-auto" stroke="currentColor" fill="none"
                                         viewBox="0 0 24 24">
                                        <defs>
                                            <linearGradient id="gradient">
                                                <stop offset="0%" stopColor="#22d3ee"/>
                                                <stop offset="100%" stopColor="#0284c7"/>
                                            </linearGradient>
                                        </defs>

                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeWidth="3"
                                            d="M4 6h20M4 12h20M4 18h20"
                                            stroke="url(#gradient)"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                            stroke="url(#gradient)"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center shrink-0 justify-start">
                                <ApplicationLogo className="block h-6 sm:h-7 lg:h-8 2xl:h-10 w-auto"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 2xl:col-span-3 order-last lg:order-none justify-center">
                        <div
                            className={auth.user ? 'w-full' : 'w-full sm:w-10/12 md:w-8/12 lg:w-10/12 mx-auto lg:mx-0'}>
                            <form className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <SelectInput id="products"
                                                 newClassName="h-full w-full shadow-none rounded-l-full bg-transparent py-0 pl-7 text-md border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0"
                                                 optionsData={{
                                                     'mobile': 'Mobile',
                                                     'watch': 'Watch',
                                                     'perfume': 'Perfume',
                                                 }}
                                                 defaultOption='All Products'
                                    />
                                </div>
                                <TextInput
                                    newClassName="block w-full rounded-full py-2 pl-48 border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 outline-none shadow-sm text-md font-bold"
                                    type="search"
                                    placeholder="Search Your Product Here..."/>

                            </form>
                        </div>
                    </div>

                    <div className="col-span-1 flex justify-end gap-1 sm:gap-6 items-center">


                        {auth.user ? (
                            <div>
                                <Link href={route('profile.edit')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={2} stroke="currentColor"
                                         className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 2xl:h-9 2xl:w-9">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                    </svg>

                                </Link>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Link
                                        className="uppercase rounded-full px-3 py-1.5 bg-sky-100 whitespace-nowrap text-xs sm:text-sm lg:text-md 2xl:text-lg"
                                        href={route('register')}
                                    >
                                        Sign Up
                                    </Link>
                                </div>

                                <div>
                                    <Link
                                        className="uppercase whitespace-nowrap px-3 py-1.5 bg-gray-200 text-xs sm:text-sm lg:text-md 2xl:text-lg"
                                        href={route('login')}
                                    >
                                        Log In
                                    </Link>
                                </div>
                            </>
                        )}

                        <div className="flex items-center">
                            <Link href="" className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={2} stroke="currentColor"
                                     className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 2xl:h-9 2xl:w-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                </svg>
                                <p className="absolute top-2 right-0 w-3 h-3 sm:h-3.5 sm:w-3.5 2xl:h-4 2xl:w-4 bg-gray-800 rounded-full flex items-center justify-center text-[0.50rem] sm:text-[0.55rem] lg:text-[0.60rem] 2xl:text-[0.65rem] text-white">
                                    {likeLength}
                                </p>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link href="" className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={2} stroke="currentColor"
                                     className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 2xl:h-9 2xl:w-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                                </svg>
                                <p className="absolute top-2 right-0 w-3 h-3 sm:h-3.5 sm:w-3.5 2xl:h-4 2xl:w-4 bg-red-500 rounded-full flex items-center justify-center text-[0.50rem] sm:text-[0.55rem] lg:text-[0.60rem] 2xl:text-[0.65rem] text-white">
                                    {cartLength}
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            <aside
                className={(showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full') + ' h-full lg:hidden fixed top-20 left-0 z-40 w-64 h-screen transition-transform transition duration-150 ease-in-out'}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-white">
                    <div className="pt-2 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            Home
                        </ResponsiveNavLink>
                    </div>
                    <div className="space-y-1">
                        <ResponsiveNavLink href="#">
                        Gadgets
                    </ResponsiveNavLink>
                </div>
                <div className="space-y-1">
                    <ResponsiveNavLink href="#">
                        Home Decor
                    </ResponsiveNavLink>
                </div>
                <div className="space-y-1">
                    <ResponsiveNavLink href="#">
                        Smart Watches
                    </ResponsiveNavLink>
                </div>
                <div className="space-y-1">
                    <ResponsiveNavLink href="#">
                        Perfumes
                    </ResponsiveNavLink>
                </div>

                <div className="space-y-1">
                    <ResponsiveNavLink href="#">
                        Cosmetics Collection
                    </ResponsiveNavLink>
                </div>

                <div className="space-y-1">
                    <ResponsiveNavLink href="#">
                        Kids Collections
                    </ResponsiveNavLink>
                </div>

                <div className="space-y-1">
                    <ResponsiveNavLink href="#">
                        All Categories
                    </ResponsiveNavLink>
                </div>

                </div>

            </aside>
        </nav>

);
}