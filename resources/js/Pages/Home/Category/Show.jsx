import {Head, usePage} from "@inertiajs/react";
import DefaultLayout from '@/Layouts/DefaultLayout.jsx';
import BannerImageSection from "@/Pages/Home/BannerImageSection.jsx";
import ProductSection from "@/Pages/Home/ProductSection.jsx";
import Pagination from "@/Components/Pagination.jsx";
import SidebarFilter from "@/Pages/Home/Category/SidebarFilter.jsx";
import ProductCard from "@/Pages/Home/ProductCard.jsx";
import {useMaxOnScreenSize} from "@/helper.ts";
import TopFilter from "@/Pages/Home/Category/TopFIlter.jsx";

export default function Show({ auth }) {
    const products = usePage().props.products
    const maxAllowedSize = useMaxOnScreenSize({
        sm:1,
        md:2,
        lg:3,
    }, 4);

    const remainingProducts = products.data.slice(maxAllowedSize);

    return (
        <DefaultLayout auth={auth}>
            <Head title="Category"/>
            <BannerImageSection imagePath="banners/perfume-image.png"
                                imageName="perfume"/>

            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 xl:gap-6">
                <div className="col-span-1">
                    <SidebarFilter/>
                </div>
                <div className="lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1">
                    <TopFilter/>
                    <div className="py-4">
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