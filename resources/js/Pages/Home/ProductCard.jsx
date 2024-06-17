import {addToCart, getCartContents, hasOnCart, image} from "@/helper.js";
import {Link, usePage} from "@inertiajs/react";

export default function ProductCard({ hasOffer=false, isHidden=false, product = null }) {

    return (
        <div className="max-w-sm border border-gray-300/80 bg-white rounded-t overflow-hidden relative">
            {product ? <div>
                <div className="absolute top-0 left-0 right-0 ">
                <div
                    className="border border-gray-300/80 border-t-0 rounded-ee-md border-l-0 absolute top-0 left-0">
                    <Link className="text-xs text-black py-1 px-4 " href={route('category', product?.category_slug)}>{product?.category}</Link>
                </div>
                <div className="p-1 text-right">
                    <Link href="#">
                        <svg className="ml-auto" width="18" height="18" viewBox="-1 0 26 22" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.0622 2.29627C20.8055 1.03954 19.1417 0.352666 17.366 0.352666C15.5903 0.352666 13.9214 1.04463 12.6647 2.30136L12.0084 2.95771L11.3418 2.29118C10.0851 1.03445 8.41117 0.337402 6.63547 0.337402C4.86486 0.337402 3.196 1.02937 1.94436 2.28101C0.687636 3.53773 -0.00432769 5.20659 0.000760282 6.98229C0.000760282 8.75799 0.697812 10.4218 1.95454 11.6785L11.5097 21.2337C11.642 21.366 11.8201 21.4372 11.9931 21.4372C12.1661 21.4372 12.3442 21.3711 12.4765 21.2388L22.052 11.6988C23.3087 10.4421 24.0007 8.77325 24.0007 6.99755C24.0058 5.22185 23.3189 3.553 22.0622 2.29627ZM21.0853 10.727L11.9931 19.7836L2.92125 10.7118C1.92401 9.71453 1.37451 8.39166 1.37451 6.98229C1.37451 5.57292 1.91892 4.25005 2.91617 3.2579C3.90832 2.26574 5.23119 1.71624 6.63547 1.71624C8.04484 1.71624 9.3728 2.26574 10.37 3.26298L11.5199 4.41286C11.7896 4.68253 12.2221 4.68253 12.4917 4.41286L13.6314 3.27316C14.6287 2.27592 15.9566 1.72642 17.3609 1.72642C18.7652 1.72642 20.0881 2.27592 21.0853 3.26807C22.0825 4.26531 22.627 5.58818 22.627 6.99755C22.632 8.40692 22.0825 9.72979 21.0853 10.727Z"
                                fill="black" stroke="black" strokeWidth="1"/>
                        </svg>
                    </Link>
                </div>
            </div>
            {!hasOffer || <div className="absolute top-12 right-0">
                <div className="bg-lime-300 h-[82px] w-20 xl:w-[88px] 2xl:w-[91px]">
                    <div className="flex flex-col h-full">
                        <div className="flex-grow flex items-center">
                            <div className="text-center align-middle w-full font-extrabold">
                                <div>
                                    {product?.offer_percentage}%
                                </div>
                                <div className="uppercase">OFF</div>
                            </div>
                        </div>
                        <div
                            className="relative h-5 border-t border-slate-400 font-extrabold text-center text-xs uppercase">
                            <span className="block capitalize">{product?.price} {usePage().props.currency_name}</span>
                            <span
                                className="absolute left-0 top-2 right-0 h-[1px] bg-black transform -translate-y-1/2"></span>
                        </div>
                    </div>

                </div>
            </div> }

            <div className="p-2 mb-12">
                <img className="m-auto" src={image('products/product-1.png')} alt="images"/>
            </div>
            <div className="absolute bottom-12 left-0 right-0">
                <div className="bg-white/50 relative z-10 px-2 bg-opacity-2">
                    <h2 className={"text-md text-center font-extrabold capitalize" + (hasOffer && " text-green-600")}>{product?.sale_price} {usePage().props.currency_name}</h2>
                    <div className="pt-0.2">
                        <ul className="flex justify-center">
                            {[...Array(5)].map((_, index) => <li key={index}>
                                <svg className={index < product?.rating ? 'text-gray-900' : 'text-gray-400'} width="12" height="12" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.86875 14.25L4.0875 8.98125L0 5.4375L5.4 4.96875L7.5 0L9.6 4.96875L15 5.4375L10.9125 8.98125L12.1312 14.25L7.5 11.4562L2.86875 14.25Z"
                                        fill="currentColor"/>
                                </svg>
                            </li>)}
                        </ul>
                    </div>
                    <p className="text-xs text-center text-black">{product?.reviews} Reviews</p>
                </div>
                <div className="px-5 pt-2">
                    <p className="text-black text-sm text-center">
                        {product?.name}
                    </p>
                </div>
            </div>
                <div className="w-full mt-4 flex justify-between">
                    { hasOnCart(product?.id) ?
                    <button
                        className="bg-black w-full text-md font-semibold text-white text-center justify-center h-10 flex items-center opacity-80 cursor-not-allowed"
                        disabled={true}>Added</button>
                :
                    <button
                        className="bg-black w-full text-md font-semibold text-white text-center justify-center h-10 flex items-center"
                        onClick={() => addToCart(product?.id)}>{hasOnCart(product?.id) ? 'Added' : 'Add to Cart'}</button>
                }
                    <Link
                        className="bg-white w-full border-[1.5px] border-black text-md font-semibold text-black text-center justify-center h-10 flex items-center"
                        href="#">Buy Now</Link>

                </div>
            </div> : <> </>}
        </div>
    );
}