import {useEffect, useState} from "react";
import RelatedProducts from "@/Pages/Home/Product/RelatedProducts.jsx";
import SocialShare from "@/Components/SocialShare.jsx";
import Reviews from "@/Pages/Home/Product/Reviews.jsx";

export default function Details({product}){
    const [activeTab, setActiveTab] = useState('specification-tab')
    const handleTab = (e) => {
        const tabName = e.target.getAttribute('id')?? e.target.parentNode.getAttribute('id')
       if (tabName === null){
           return;
       }
        setActiveTab(tabName)
    }

return (
    <section className="grid lg:grid-cols-7 gap-8 mt-6">
        {/** Product Details */}
        <div className="lg:col-span-5">
            {/** tab */}
                <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <div>
                        <button className={"inline-block px-5 py-2.5 border border-e-0 border-gray-300/80 " + (activeTab === "specification-tab" ? 'text-black' : 'text-gray-600 hover:text-black') }
                                id="specification-tab"
                                type="button"
                                onClick={handleTab}
                                disabled={activeTab === "specification-tab"}
                        >
                            Specification
                        </button>
                    </div>
                    <div>
                        <button
                            className={"inline-block px-5 py-2.5 border border-e-0 border-gray-300/80 " + (activeTab === "description-tab" ? 'text-black' : 'text-gray-600 hover:text-black') }
                            id="description-tab"
                            onClick={handleTab}
                            disabled={activeTab === "description-tab"}
                            type="button">
                            Description
                        </button>
                    </div>
                    <div>
                        <button
                            className={"relative inline-block px-5 py-2.5 border border-gray-300/80 " + (activeTab === "reviews-tab" ? 'text-black' : 'text-gray-600 hover:text-black') }
                            id="reviews-tab"
                            onClick={handleTab}
                            disabled={activeTab === "reviews-tab"}
                            type="button">
                            <span className="mr-4">
                                Reviews
                            </span>
                            <p className="absolute top-2 right-4 w-3 h-3 sm:h-3.5 sm:w-3.5 2xl:h-4 2xl:w-4 bg-blue-800 rounded-full flex items-center justify-center text-[0.50rem] sm:text-[0.55rem] lg:text-[0.60rem] 2xl:text-[0.65rem] text-white">
                                {product?.reviews}
                            </p>
                        </button>
                    </div>
                </div>

            {/** tabs data */}
            <div className="border border-gray-300/80">
                { activeTab === "specification-tab" &&
                <div className="p-4 rounded-lg bg-white">
                    <p className="text-sm text-gray-600">
                        {product?.specification}
                    </p>
                </div>
                }
                { activeTab === "description-tab" &&
                <div className="p-4 rounded-lg bg-white"
                >
                    <p className="text-sm text-gray-600">
                        {product?.description}
                    </p>
                </div>
                }
                { activeTab === "reviews-tab" &&
                <div className="p-4 rounded-lg bg-white">
                    <div className="text-sm text-gray-600">

                        <Reviews productId={product?.sku_id}
                        totalReviews={product?.reviews}
                        rating={product?.rating}
                        />
                    </div>
                </div>
                }
            </div>

        </div>

        {/** Related Products */}
        <div className="lg:col-span-2">
            <div className="mb-4">
                <SocialShare url={route('product.view', {
                    slug: product?.slug ?? product?.hash_id,
                })} title={product?.title}/>
            </div>
            <RelatedProducts categorySlug={product?.category_slug} sellingPrice={product?.selling_price}/>

        </div>
    </section>
)
}