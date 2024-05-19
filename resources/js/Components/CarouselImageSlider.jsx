import React, { useState, useEffect } from 'react'
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

export default function CarouselImageSlider ({ slides, hasLink = false, autoSlide = false, autoSlideInterval = 3000 }) {
    const [current, setCurrent] = useState(0)

    const previous = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current- 1))

    const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])


    return (
        <div className="relative group/slide w-full h-full">
            <div className="relative w-full h-52 sm:h-80 xl:h-[22rem] overflow-hidden rounded-lg">

                {slides.map((slide, index) => (
                    hasLink ? (
                        <a
                            href={slide.url}
                            className={`duration-700 ease-in-out absolute inset-0 transition-transform transform ${current === index ? 'translate-x-0' : 'translate-x-full'}`}
                            key={`slide-${index}`}
                        >
                            <img
                                src={slide.img}
                                className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt={`slide-${index}`}
                            />
                        </a>
                    ) : (
                        <div
                            className={`duration-700 ease-in-out absolute inset-0 transition-transform transform ${current === index ? 'translate-x-0' : 'translate-x-full' }`}
                            key={`slide-${index}`}
                        >
                            <img
                                src={slide}
                                className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt={`slide-${index}`}
                            />
                        </div>
                    )
                ))}


            </div>
    <div className="absolute z-10 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((slide, index) => (
            <button type="button"
                    className={`w-3 h-3 ${current === index ? 'bg-black/80' : 'bg-black/50'} rounded-full`}
                    key={`slide-${index}`}
                    onClick={() => setCurrent(index)}
            />
        ))}
    </div>

    <button type="button"
            className="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hidden group-hover/slide:block"
            onClick={() => previous()}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/30 group-hover:bg-gray-500/40 group-focus:outline-none">
            <IconChevronLeft className="w-4 h-4 text-black"/>
            <span className="sr-only">Previous</span>
        </span>
            </button>
            <button type="button"
                    className="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hidden group-hover/slide:block"
                    onClick={() => next()}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/30 group-hover:bg-gray-500/40 group-focus:outline-none">
            <IconChevronRight className="w-4 h-4 text-black"/>
            <span className="sr-only">Next</span>
        </span>
            </button>
        </div>
)}