import { image} from '@/helper.js';
import {
    IconChevronRight,
    IconStar,
    IconChevronDown
} from '@tabler/icons-react';
import CarouselImageSlider from "@/Components/CarouselImageSlider.jsx";
import {usePage} from "@inertiajs/react";

export default function HeroSection() {
    const props = usePage().props

    return (

        <section className="my-2">
                <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                    <div className="col-span-1 hidden lg:block">
                        <div className="h-full border border-black border-b-[10px] rounded-lg overflow-hidden text-sm">
                            <div>
                                <a className="flex items-center justify-between py-2.5 px-4 bg-black text-white" href="#">
                                    Categories
                                    <IconChevronDown className='text-green-400' />
                                </a>
                            </div>
                            {props.categories && props.categories.map((category, index) => (
                                <div className="border-b border-black" key={index}>
                                    <a className="flex items-center justify-between py-2 px-4 text-black gap-2" href="#">
                                        {category.name}
                                        <div className="flex gap-2 items-center">
                                            <IconStar className="text-gray-500" size={12} />
                                            <IconChevronRight className="text-gray-400" size={24} />
                                        </div>
                                    </a>
                                </div>
                            ))}

                            <div>
                                <a className="flex items-center justify-between py-2 px-4 text-black gap-2" href="#">
                                    See All Categories
                                    <div className="flex gap-2 items-center">
                                        <IconStar className="text-gray-500" size={12} />
                                        <IconChevronRight className="text-gray-400" size={24} />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-3 2xl:col-span-4">
                            <CarouselImageSlider slides= {[
                                image('heroes/hero-banner.jpg'),
                                image('heroes/0a026a71.png'),
                                image('heroes/design-banner.png'),
                                image('heroes/product-sale-banner.png')
                            ]}
                                                 autoSlide={true}
                                                 autoSlideInterval="5000"
                            />
                    </div>
                </div>
        </section>
    );
}