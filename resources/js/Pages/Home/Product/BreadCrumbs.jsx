import {Link} from "@inertiajs/react";

export default function BreadCrumbs({product}){

    return (
        <div className="flex items-center text-[#8e8e8e] text-xs mt-5 mb-3">
            <Link href={route('home')}>
                Home
            </Link>
            <span className="mx-1">/</span>
            <Link href={route('category', product?.category_slug)}>
                {product?.category}
            </Link>

            {typeof product?.subcategory !== 'undefined' &&
                <>
                    <span className="mx-1">/</span>
                    <Link href={route('category', product?.subcategory)}>
                        {product?.subcategory}
                    </Link>
                </>
            }

            <span className="mx-1">/</span>
            <Link href={route('category', product?.brand)}>
                {product?.brand}
            </Link>

            <span className="mx-1">/</span>
            <p>{product?.title.split(" ").slice(0, 4).join(" ") + '...'}</p>

        </div>
    )
}