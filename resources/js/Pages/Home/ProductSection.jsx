import ProductCard from "@/Pages/Home/ProductCard.jsx";
import {useMaxOnScreenSize} from "@/helper.js";

export  default function Product({products, productResize = true,  ...props}) {

    const maxAllowedSize = productResize ? useMaxOnScreenSize({
        sm:Math.floor(products.length/2)*2,//sm
        md:Math.floor(products.length/3)*3,//md
        lg: Math.floor(products.length/4)*4//lg
    }, products.length) : products.length;

    const hasTitle = () => {
        if (typeof props.title === 'string' || typeof props.subtitle === 'string') {
            return (
                <div className="my-2">
                    {props.title && <h2 className="text-3xl font-bold text-center">{props.title}</h2>}
                    {props.subtitle && <p className="text-sm text-center text-neutral-500">{props.subtitle}</p>}
                </div>
            );
        }
    }

    return (
        <section className="my-4">
                {hasTitle()}
                <div className="py-4">
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 xl:gap-6">
                     {products.slice(0, maxAllowedSize).map((value, index) => <ProductCard key={index} product={value}/>)}
                 </div>
             </div>
     </section>
 )
}