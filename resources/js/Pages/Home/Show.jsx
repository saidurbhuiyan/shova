import {Head, usePage} from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import HeroSection from '@/Pages/Home/HeroSection.jsx';
import ProductSection from "@/Pages/Home/ProductSection.jsx";
import BannerImageSection from "@/Pages/Home/BannerImageSection.jsx";
import Footer from "@/Includes/Footer.jsx";


export default function Show({ auth }) {
    const props = usePage().props
    return (
        <DefaultLayout auth={auth}>
            <Head title="Home"/>

            <HeroSection/>

            <ProductSection products={props.latestProduct}/>

            <BannerImageSection imagePath="banners/call-to-action.png"/>

            <ProductSection products={props.firstBannerProduct}
                            moreProductsByCategory={props.bannerProductCategoriesSlug.firstBannerProduct} />

            <BannerImageSection imagePath="banners/perfume-image.png"
                                imageName="perfume"/>

            <ProductSection products={props.secondBannerProduct}
                            moreProductsByCategory={props.bannerProductCategoriesSlug.secondBannerProduct} />

            <Footer/>


        </DefaultLayout>
    );
}
