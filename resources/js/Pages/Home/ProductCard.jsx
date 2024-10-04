import {Link, usePage} from "@inertiajs/react";
import {router} from "@inertiajs/core";
import LikeButton from "@/Components/LikeButton.jsx";
import IconOnRating from "@/Components/IconOnRating.jsx";

export default function ProductCard({ product = null }) {


    const hasOffer = product?.selling_price < product?.original_price
    return (
        <div className="max-w-sm border border-gray-300/80 bg-white rounded-t overflow-hidden relative hover:shadow-md">
            {product ? <div>
                <Link
                    href={route('product.view', {
                        slug: product?.slug ?? product?.hash_id,
                    })}
                >
                    <div className="relative p-2">
                    <div className="absolute top-0 left-0 right-0">
                        <div
                            className="border border-gray-300/80 border-t-0 rounded-ee-md border-l-0 absolute top-0 left-0">
                            <button className="text-xs text-black py-1 px-2"
                                    onClick={function (e) {
                                        e.preventDefault();
                                        router.visit(route('product.search', {category:product?.category_slug}))
                                    }}>{product?.category}</button>
                        </div>
                        <div className="p-1 text-right">
                            <LikeButton className="p-1" productId={product?.sku_id} />
                        </div>
                    </div>
                    {hasOffer && <div className="absolute top-12 left-0">
                        <div className="bg-[#0052b2] text-white px-2 py-1">
                            <div className="flex flex-col h-full">
                                <div className="flex-grow flex items-center">
                                    <div className="text-xs align-middle w-full font-extrabold">
                                        <div>
                                            {product?.offer_percentage}%
                                        </div>
                                        <div className="uppercase">OFF</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>}

                    <div>
                        <img className="m-auto" src={product?.image?.image_url} alt={product?.title}/>
                    </div>
                        <div className="relative">
                    <div className="absolute -bottom-3 left-0 right-0">
                        <div className="z-10 p-2 bg-opacity-2">
                                <ul className="flex justify-center">
                                    <li className="w-full m-auto">
                                        <div className="bg-[#f1f1f1] p-[0.5px]"></div>
                                    </li>
                                    <li className="w-full m-auto">
                                        <IconOnRating rating={product?.rating}/>
                                    </li>

                                    <li className="w-full m-auto">
                                        <div className="bg-[#f1f1f1] p-[0.5px]"></div>
                                    </li>
                                </ul>
                        </div>
                        </div>
                    </div>
                    <div className="px-4">
                        <p className="text-black text-base pt-2">
                            {product?.title}
                        </p>
                        <div className="flex">
                            <div className={"text-lg font-extrabold capitalize pb-2" + (hasOffer && " text-[#0052b2]")}>{product?.selling_price} {usePage().props.currency_name}</div>
                            {hasOffer && <div className="relative ml-[10px] pb-2 flex items-center">
                                <span
                                    className="text-base capitalize text-[#3a3636]">{product?.original_price} {usePage().props.currency_name}</span>
                                <span
                                    className="absolute left-0 top-3.5 right-0 h-[1px] bg-[#3a3636] transform -translate-y-1/2"></span>
                            </div>
                            }
                        </div>

                    </div>
                    </div>
                </Link>
            </div> : <> </>}
        </div>
    );
}