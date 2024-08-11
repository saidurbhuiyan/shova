import React from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import IconOnRating from "@/Components/IconOnRating.jsx";
import {useForm, usePage} from "@inertiajs/react";
import InputError from "@/Components/InputError.jsx";

export default function WriteReview({productId}) {
    const { data, setData, post, processing, errors } = useForm({
        comment: '',
        rating: 5,
    });

    /**
     * handle write review post request
     */
    const handleWriteReview = () => {
        post(route('product.reviews.store', productId));
    };

    return (
        <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">Write a Review</h2>
                        <div className="ml-4">
                            <div className="flex items-center">
                                <h3 className="text-lg font-bold mx-1">Give Ratings:</h3>
                                <IconOnRating
                                    rating={data.rating}
                                    changeRating={true}
                                    onRatingChange={(rating) => setData('rating', rating)}
                                />
                            </div>
                            <InputError message={errors.rating} className="mt-2"/>
                        </div>
                    </div>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                        rows="4"
                    ></textarea>
                    <InputError message={errors.comment} className="mt-2"/>
                    <div className="text-right mt-4">
                        <PrimaryButton onClick={handleWriteReview} disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </div>

        </div>
    );
}
