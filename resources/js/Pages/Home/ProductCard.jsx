import {getCartContents, image} from "@/helper.js";
import {Link, usePage} from "@inertiajs/react";
import {addToLike, hasOnLike, removeFromLike} from "@/ProductLike.js";
import {useState} from "react";
import {router} from "@inertiajs/core";

export default function ProductCard({ product = null }) {

    const [hasLike, setHasLike] = useState(hasOnLike(product?.sku_id))

    window.addEventListener('likeChange', function(event) {
        setHasLike(hasOnLike(product?.sku_id))
    });

    const hasOffer = product?.sale_price < product?.price

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
                                        router.visit(route('category', product?.category_slug))
                                    }}>{product?.category}</button>
                        </div>
                        <div className="p-1 text-right">
                            {hasLike ?
                                <button
                                    onClick={function (e) {
                                        e.preventDefault();
                                        removeFromLike(product?.sku_id)
                                    }}>
                                    <svg className="ml-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         viewBox="0 0 24 24"
                                         fill="#FF6767">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"/>
                                    </svg>
                                </button>
                                :
                                <button
                                    onClick={function (e) {
                                        e.preventDefault();
                                        addToLike(product?.sku_id)
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="ml-auto">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                                    </svg>
                                </button>
                            }
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
                        <img className="m-auto" src={product?.image} alt={product?.title}/>
                    </div>
                        <div className="relative">
                    <div className="absolute -bottom-3 left-0 right-0">
                        <div className="z-10 p-2 bg-opacity-2">
                                <ul className="flex justify-center">
                                    <li className="w-full m-auto">
                                        <div className="bg-[#f1f1f1] p-[0.5px]"></div>
                                    </li>
                                    {[...Array(product?.rating <= 0 ? 1 : 5)].map((_, index) => <li key={index}>
                                            {index < product?.rating ?
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor"
                                                     className="size-[18px] text-[#EEC800]">
                                                    <path fillRule="evenodd"
                                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor"
                                                     className="size-[18px] text-[#EEC800]">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                                                </svg>

                                            }
                                        </li>
                                    )}
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
                            <div className={"text-lg font-extrabold capitalize pb-2" + (hasOffer && " text-[#0052b2]")}>{product?.sale_price} {usePage().props.currency_name}</div>
                            {hasOffer && <div className="relative ml-[10px] pb-2 flex items-center">
                                <span
                                    className="text-base capitalize text-[#3a3636]">{product?.price} {usePage().props.currency_name}</span>
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