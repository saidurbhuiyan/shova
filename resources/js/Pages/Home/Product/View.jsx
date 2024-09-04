import {Head} from "@inertiajs/react";
import DefaultLayout from '@/Layouts/DefaultLayout';
import Preview from './Preview';
import BreadCrumbs from "@/Pages/Home/Product/BreadCrumbs.jsx";
import Details from "@/Pages/Home/Product/Details.jsx";
import {isMobile} from "@/helper.ts";


export default function View({ auth, product }) {

    return (
        <DefaultLayout auth={auth}>
            <Head title={product?.title}/>
            {!isMobile() && <BreadCrumbs product={product}/>}
            <Preview product={product}/>
            <Details product={product}/>

        </DefaultLayout>
    );
}