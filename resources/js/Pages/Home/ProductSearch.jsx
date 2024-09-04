import React, {useState, useCallback, useMemo, useEffect} from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import { Link, usePage } from "@inertiajs/react";

export default function Search({ auth }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [moreUrl, setMoreUrl] = useState(route('category'))
    const props = usePage().props;

    const searchProducts = async () => {
        try {
            const response = await axios.get(route('product.search'), {
                params: {
                    searchTerm: query,
                    category: selectedCategory
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }

        setMoreUrl(route('category', [selectedCategory, {'searchTerm' : query}]));

    };

    const debouncedSearch = useCallback(debounce(searchProducts, 500));

    useEffect(() => {
        if (query.length > 2) {
            debouncedSearch();
        } else {
            setResults([]);
        }
    }, [query, selectedCategory]);

    const optionsData = useMemo(() => {
        return props.categories ? Object.fromEntries(
            props.categories.map(category => [category.slug, category.name])
        ) : {};
    }, [props.categories]);

    return (
        <div className={'w-full' + (auth.user ? '' : ' sm:w-10/12 md:w-8/12 lg:w-10/12 mx-auto lg:mx-0')}>
            <form className="relative overflow-y-hidden">
                <div className="absolute inset-y-0 left-0 flex w-4/12 items-center">
                    <SelectInput
                        id="products"
                        newClassName="h-full shadow-none w-full rounded-l-full bg-transparent py-0 pl-6 text-md border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0"
                        optionsData={optionsData}
                        defaultOption='All Products'
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                </div>
                <TextInput
                    newClassName="block w-full rounded-full py-2 pl-[34.5%] border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 outline-none shadow-sm text-md font-bold"
                    type="text"
                    value={query}
                    onChange={(e)=> setQuery(e.target.value)}
                    placeholder="Search products..."
                />

                {results.length > 0 && (
                    <div className="absolute w-full z-40 duration-150 ease-in-out flex justify-center">
                        <ul className="fixed w-full max-w-md min-h-72 m-1 bg-white border border-gray-300 mt-2 rounded-lg shadow-lg">
                            {results.map((product) => (
                                <li key={product.id} className="flex items-center p-2 hover:bg-gray-100">
                                    <img src={product.image.image_url} alt={product.title} className="w-12 h-12 mr-3"/>
                                    <Link
                                        href={route('product.view', {
                                            slug: product?.slug ?? product?.hash_id,
                                        })} className="text-gray-800">
                                        {product.title}
                                    </Link>
                                </li>
                            ))}
                            <li className="text-center p-2">
                                <Link className="underline underline-offset-2 text-blue-600 font-extrabold hover:text-blue-600/80" href={moreUrl}>Load More</Link>
                            </li>
                        </ul>
                    </div>
                )}

                {query.length > 2 && results.length === 0 && (
                    <div className="absolute w-full z-40 duration-150 ease-in-out flex justify-center">
                        <ul className="fixed w-full max-w-md min-h-72 m-1 bg-white border border-gray-300 mt-2 rounded-lg shadow-lg">
                            <li className="text-center py-12 px-2 hover:bg-gray-100">
                                No results found
                            </li>
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
}
