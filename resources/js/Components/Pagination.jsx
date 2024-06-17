import React from 'react';
import {Link} from "@inertiajs/react";

export default function Pagination({ paginateData }) {

    return (
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            {paginateData && (
                <>
                    <div className="flex sm:flex-1 sm:items-center sm:justify-between">
                        <div className="text-sm font-normal text-gray-500">
                            Showing
                            <span className="font-semibold text-gray-900 mx-1">
                {paginateData.from}-{paginateData.to}
              </span>
                            of
                            <span className="font-semibold text-gray-900 mx-1">
                {paginateData.total}
              </span>
                        </div>
                    </div>

                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Table navigation"
                    >
                        <ul className="inline-flex items-center -space-x-px">
                            {paginateData.current_page === 1 || paginateData.first_page_url
                            === null ? null :
                                <li key={1}>
                                    <Link href={paginateData.first_page_url}
                                          className="block px-3 py-1.5 mx-0.5 leading-tight border border-gray-300 text-black bg-white hover:bg-black hover:text-white"

                                    >
                                        First
                                    </Link>

                                </li>
                            }
                            {paginateData.prev_page_url === null ? null :
                                <li key={paginateData.total+1}>
                                    <Link href={paginateData.prev_page_url}
                                          className="block px-3 py-1.5 mx-0.5 leading-tight border border-gray-300 text-black bg-white hover:bg-black hover:text-white"

                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
                                        </svg>

                                    </Link>

                                </li>
                            }
                            {paginateData.links.map((link, index) => (
                                isNaN(Number(link.label)) || link.url === null || !(Number(link.label) < paginateData.current_page + 3 && Number(link.label) > paginateData.current_page - 3) ? null :
                                    <li key={index}>
                                        <Link href={link.url}
                                            className={`block px-3 py-1.5 mx-0.5 leading-tight border border-gray-300 hover:bg-black hover:text-white 
                                      
                                         ${
                                                link.active || link.url === null
                                                    ? 'pointer-events-none'
                                                    : ''
                                            } ${
                                                paginateData.current_page === Number(link.label)
                                                    ? 'text-white bg-black'
                                                    : 'text-black bg-white'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                            ))}
                            {paginateData.next_page_url === null ? null :
                                <li key={paginateData.last_page+1}>
                                    <Link href={paginateData.next_page_url}
                                          className="block px-3 py-1.5 mx-0.5 leading-tight border border-gray-300 text-black bg-white hover:bg-black hover:text-white"

                                    >
                                        <span className="sr-only">Next</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                                        </svg>
                                    </Link>

                                </li>
                            }
                            {paginateData.current_page === paginateData.last_page || paginateData.last_page_url
                            === null ? null :
                                <li key={paginateData.last_page}>
                                    <Link href={paginateData.last_page_url}
                                          className="block px-3 py-1.5 mx-0.5 leading-tight border border-gray-300 text-black bg-white hover:bg-black hover:text-white"

                                    >
                                        Last
                                    </Link>

                            </li>
                            }
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};
