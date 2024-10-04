import {Head, usePage, router} from "@inertiajs/react";
import DefaultLayout from '@/Layouts/DefaultLayout.jsx';
import BannerImageSection from "@/Pages/Home/BannerImageSection.jsx";
import ProductSection from "@/Pages/Home/ProductSection.jsx";
import Pagination from "@/Components/Pagination.jsx";
import SidebarFilter from "@/Pages/Home/Search/SidebarFilter.jsx";
import ProductCard from "@/Pages/Home/ProductCard.jsx";
import {getUrlParam, useMaxOnScreenSize} from "@/helper.ts";
import TopFilter from "@/Pages/Home/Search/TopFIlter.jsx";
import {useCallback, useState} from "react";
import debounce from "lodash.debounce";
import CategoryList from "@/Pages/Home/Search/CategoryList.jsx";

export default function Show({ auth }) {
    const [filters, setFilters] = useState({
        priceRangeFirst: 0,
        priceRangeLast: getUrlParam('priceRangeLast') ?? 10,
        sortOrder: getUrlParam('sortOrder') ?? '',
        onOffer: getUrlParam('onOffer') === 'true',
        inStock: getUrlParam('inStock') === 'true',
        perPage: getUrlParam('perPage') ?? 14,
    });

    const { url, component, props } =  usePage();

    const products = props.products
    const maxAllowedSize = useMaxOnScreenSize({
        sm:0,
        md:2,
        lg:3,
    }, 4);

    const remainingProducts = products.data.slice(maxAllowedSize);


    const debounceVisit = useCallback(
        debounce((params, shouldReset = false) => {
            if (shouldReset) {
                router.visit(url.split('?')[0])
                return;
            }

            router.visit(url,
                {
                    data: params
                });
        }, 500),
        [url]
    );

    const handleFilterChange = (updatedFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...updatedFilters }));
        debounceVisit(updatedFilters);

    };

    const handleResetFilter = () => {
        // filter default
        setFilters({
            priceRangeFirst: 500,
            priceRangeLast: 50000,
            sortOrder: '',
            onOffer: false,
            inStock: false,
            perPage: 14,
        });

        // reset url
        debounceVisit({}, true);
    };

    return (
        <DefaultLayout auth={auth}>
            <Head title="Search Results"/>

            <CategoryList categories={props.categories}/>

            <div className="sm:grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3 xl:gap-6">
                <div className="col-span-1 mb-2 sm:mb-0">
                    <SidebarFilter onFilterChange={handleFilterChange}
                                   resetFilter={handleResetFilter}
                                   filters={filters}/>
                </div>
                <div className="lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1">
                    <TopFilter onFilterChange={handleFilterChange}
                               filters={filters} />
                    <div className="sm:py-4">
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 xl:gap-6">
                            {
                                products.data.slice(0, maxAllowedSize).map((value, index) => <ProductCard
                                key={index}
                                product={value}/>)
                            }
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 md:col-span-4 sm:col-span-3 col-span-2">
                    <ProductSection products={remainingProducts}
                                    productResize={false}
                    />
                </div>
            </div>
            <Pagination paginateData={products}/>


        </DefaultLayout>
    );
}