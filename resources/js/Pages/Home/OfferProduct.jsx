import ProductCard from "@/Pages/Home/ProductCard.jsx";
import {image, useMaxOnScreenSize} from "@/helper.js";

export default function OfferProduct({products}) {

    const maxAllowedSize = useMaxOnScreenSize({
        sm:2,
        md:3,
        lg:2,
    }, 3);

    return (
        <section className="my-4">
                <div className="py-4">
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 xl:gap-6">
                        {products.slice(0,maxAllowedSize).map((value, index) => <ProductCard key={index} hasOffer={true} product={value}/>)}
                        {products.length < 3 && [...Array(3 - products.length)].map((_, index) => <ProductCard key={index} hasOffer={true}/>)}
                        <img className="col-span-2 sm:col-span-3 md:col-span-2 w-full h-full border border-slate-300 rounded order-first md:order-last"
                             src={image('banners/limited.png')}
                             alt="offer"/>
                    </div>
                </div>
        </section>
    );
}