import {Head, usePage} from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import HeroSection from '@/Pages/Home/HeroSection.jsx';
import ProductSection from "@/Pages/Home/ProductSection.jsx";
import BannerImageSection from "@/Pages/Home/BannerImageSection.jsx";
import Footer from "@/Includes/Footer.jsx";
import OfferProduct from "@/Pages/Home/OfferProduct.jsx";


export default function Show({ auth }) {
    const props = usePage().props
    return (
        <DefaultLayout auth={auth}>
            <Head title="Show"/>

            <HeroSection/>

            <OfferProduct products={props.offerProduct}/>

            <ProductSection title="Our latest Products"
                             subtitle="Here are top ten latest products. They maybe exist in various categories."
            products={props.latestProduct}/>

            <BannerImageSection imagePath="banners/call-to-action.png"/>

            <ProductSection products={props.firstBannerProduct}/>

            <BannerImageSection imagePath="banners/perfume-image.png"
                                imageName="perfume"/>

            <ProductSection products={props.secondBannerProduct}/>

            <Footer/>


        </DefaultLayout>
    );
}
