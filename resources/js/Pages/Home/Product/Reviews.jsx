import {Link, usePage, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useEffect, useState} from "react";
import IconOnRating from "@/Components/IconOnRating.jsx";
import WriteReview from "@/Pages/Home/Product/WriteReview.jsx";


export default function Reviews({productId, totalReviews, rating}) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const props = usePage().props

    /**
     * fetch
     */
    const fetchReviews = () => {
        (async () => {
            try {
                const response = await fetch(route('product.reviews.show', productId)+'?page=${page}');
                const result = await response.json();
                setReviews((prevReviews) => [...prevReviews, ...result.data]);
                setHasMore(result.current_page < result.last_page);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }

    /**
     * hande button to show more review
     * @param e
     */
    const handleMoreButton = (e) => {
        e.preventDefault();
        if (!hasMore) {
            return;
        }
        setPage((prevPage) => prevPage + 1);
    };

    /**
     * handle the button to write review
     */
    const handleWriteReviewClick = () => {

        if(!props.auth.user){
            router.visit(`${route('login')}?return_to=${encodeURIComponent(window.location.pathname)}`)
            return;
        }

        setShowReviewForm(true);
    };

    useEffect(() => {
        fetchReviews();
    }, [page,productId]);

    useEffect(() => {
        if (props.flash.success) {
            setShowReviewForm(false);
        }
    }, [props.flash.success]);

    return (
        <div className="border border-gray-300/80 bg-[#dcf0ff]">
            {props.flash.success && <div className="text-green-500 m-2 p-2 bg-green-100 border rounded shadow border-green-500 text-center">{props.flash.success}</div>}
            {props.flash.error && <div className="text-red-500 m-2 p-2 bg-red-100 border rounded shadow border-red-500 text-center">{props.flash.error}</div>}

            {!props.hasReview && showReviewForm &&
                <WriteReview productId={productId} />
            }

            <div className="px-5 py-2.5 capitalize flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="text-black font-extrabold text-xl">
                                Reviews: <span>({totalReviews})</span>
                            </div>
                            <div className="flex items-center px-2 py-1 mx-2">
                                <div className="mr-1 text-[#7f7f7f] font-extrabold">
                                    {rating}/5
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     fill="currentColor"
                                     className="size-4 text-[#EEC800]">
                                    <path fillRule="evenodd"
                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            {!props.hasReview && !showReviewForm && <PrimaryButton onClick={handleWriteReviewClick}>
                                Write a Review
                            </PrimaryButton>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        {!loading && reviews.length > 0 ? reviews.map((review, key) => (
                            <div key={key} className={(props.auth.user?.name === review?.user_name ? "bg-emerald-50" : "bg-white") +" border border-gray-300/80 grid grid-cols-12 m-2 p-2"}>
                                <div className="col-span-1">
                                    <img className="h-[50px] w-[50px]" src={review?.user_image}
                                         alt={review?.user_name} />
                                </div>
                                <div className="p-3 pr-0 w-full col-span-11">
                                    <div className="flex justify-between mb-2 text-black capitalize text-sm">
                                        <p>{review?.user_name}</p>
                                            <IconOnRating rating={review?.rating} />
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        {review?.comment}
                                    </p>
                                    <p className="text-xs text-right">
                                        {review?.created_at}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center m-4">
                                <div role="status">
                                    <svg aria-hidden="true"
                                         className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="px-5 py-2.5 capitalize text-right">
                        <Link href="#" onClick={handleMoreButton} className="text-xs text-blue-500">Load More...</Link>
                    </div>
        </div>
    );
}