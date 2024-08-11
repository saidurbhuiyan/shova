import ZoomImage from "@/Pages/Home/Product/ZoomImage.jsx";
import {useRef, useState} from "react";
import LikeButton from "@/Components/LikeButton.jsx";
import {usePage} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import Pluralize from "@/Pluralize.ts";
import {colorCodeByName, mapAttributes} from "@/helper.ts";
export default function Preview({product}){
    const [selectedImage, setSelectedImage] =useState(product?.image)
    const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]?? null)
    const [selectedAttribute, setSelectedAttribute] = useState(mapAttributes(selectedVariant, true))
    const cartQuantity  = useRef(1);

    const pluralize = new Pluralize()
    const variantAttributes = mapAttributes(product?.variants)


    const handleClick = (e) => {
        if (e.target.src === selectedImage.image_url){
            return;
        }
        const imageKey = Number(e.target.getAttribute('imagekey'))
        const image = product?.images[imageKey] ?? null
        if (image === null){
            return;
        }

        setSelectedImage(image)
    }

    const handleVariantClick = (name, attributeName) => {
            if(typeof attributeName === 'undefined' || typeof name === 'undefined'){
            return;
            }

            const attribute = selectedAttribute.some(attribute => attribute.name === name && attribute.attribute === attributeName)

            if (attribute){
                return;
            }

        setSelectedAttribute(prevAttributes => {
            const updatedAttributes = prevAttributes.filter(attr => attr.name !== name);
            return [...updatedAttributes, { name, attribute: attributeName }];
        });

        const variant = product.variants.find(variant =>
            selectedAttribute.every(selectedAttr =>
                variant.attributes?.some(variantAttr =>
                    variantAttr.name === selectedAttr.name && variantAttr.value === selectedAttr.attribute
                )
            )
        )

        setSelectedVariant(variant)

           const image = product?.images.find((image)=> image.color_name === attributeName)
            image && setSelectedImage(image)


    }


    return (
        <section className="grid lg:grid-cols-11 gap-8">

            {/*image preview*/}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
                <div>
                <div className="mb-4 font-extrabold text-2xl">
                    {product?.title}
                </div>
                <div className="grid md:grid-cols-4 gap-4 items-center justify-center">
                    <div className="col-span-1 order-last md:order-first grid grid-cols-4 md:grid-cols-1 grid-rows-1 md:grid-rows-4 gap-2 h-full p-2 bg-[#dcf0ff] items-center w-full">
                        {typeof product.images === 'object' && product.images.map((image, index) =>
                            <div key={index} className="col-span-1 row-span-1">
                                <img onClick={handleClick} className={"m-auto border border-gray-300/80 h-[100px] w-[100px] rounded bg-white " + (selectedImage.image_url === image.image_url? " border-[6px] 2xl:border-8 border-gray-600" : 'hover:border-[6px] hover:2xl:border-8 hover:border-gray-600')}
                                     imagekey={index} src={image.image_url} alt={product?.title+'-'+index}/>
                            </div>
                        )}

                    </div>
                    <div className="md:col-span-3 h-full max-h-[500px] w-full max-w-[500px] border border-gray-300/80 p-2 rounded">
                        <div className="relative w-full h-full">
                            <ZoomImage img={selectedImage.image_url} imageTitle={product?.title} height={500} width={500} zoomScale={2}/>
                            <div className="absolute top-0 right-0 flex items-center px-2 py-1">
                                <div className="mr-2 text-[#7f7f7f] font-extrabold">
                                    {product?.rating}/5
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     fill="currentColor"
                                     className="size-5 text-[#EEC800]">
                                    <path fillRule="evenodd"
                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
            </div>

            {/** product summary*/}
            <div className="lg:col-span-5 mx-2 lg:ml-4 xl:ml-16">
                <div className="mb-4 flex gap-3 justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="bg-gray-100 py-1 px-3 uppercase rounded-full text-sm font-extrabold">
                            {product?.is_stocked && selectedVariant.is_stocked ?
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="size-5 text-green-600">
                                        <path fillRule="evenodd"
                                              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="ml-2">
                                    in stock
                                </span>
                                </div>
                                :
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="size-5 text-orange-400">
                                        <path fillRule="evenodd"
                                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="ml-2">
                                    out of stock
                                </span>
                                </div>
                            }
                        </div>
                        <div className="bg-gray-100 py-1 px-3 rounded-full capitalize text-sm">
                            Brand:
                            <span className=" ml-1 font-extrabold">
                                {product?.brand}
                            </span>
                        </div>
                        <div className="bg-gray-100 py-1 px-3 capitalize rounded-full text-sm">
                            SKU:
                            <span className="ml-1 font-extrabold">
                                {selectedVariant?.sku ?? product?.sku}
                            </span>
                        </div>
                    </div>
                    <div>
                        <LikeButton className="p-1 bg-gray-200 rounded" productId={product?.sku_id}/>
                    </div>

                </div>

                <div className="mb-4 xl:mb-8 flex justify-between gap-2">
                    <div className="flex text-xl xl:text-3xl font-extrabold border border-black rounded items-center">
                        <div className="bg-black py-2 px-6 text-white">
                            Price :
                        </div>
                        <div className="uppercase py-2 px-8">
                            {selectedVariant?.selling_price ?? product?.selling_price} {usePage().props.currency_name}
                        </div>
                    </div>

                    {/**product quantity*/}
                    {selectedVariant?.is_stocked && product?.is_stocked &&
                        <div className="flex text-3xl font-extrabold border border-black rounded items-center">
                            <button className="p-2 h-full" onClick={() => cartQuantity.current.stepUp()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>

                            </button>
                            <TextInput ref={cartQuantity}
                                       newClassName="no-spinner focus:ring-0 focus:ring-offset-0 outline-none border-none text-center"
                                       type="number" min="1" max={selectedVariant.available_quantity} defaultValue="1"
                            />
                            <button className="p-2" onClick={() => cartQuantity.current.stepDown()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                </svg>

                            </button>
                        </div>
                    }

                </div>

                <div className="mb-4 xl:mb-8 text-gray-600">
                    <p className="text-md font-extrabold mb-2">
                        Special Features:
                    </p>
                    <p className="text-xs">
                        {product?.short_description}
                    </p>
                </div>

                <div className="mb-8 md:grid md:grid-cols-2 items-center">
                    {variantAttributes && variantAttributes.map((attribute, attrIndex) => (
                        <div className="col-span-1 mb-2" key={attrIndex}>
                            <div className="text-lg font-extrabold capitalize">
                                {pluralize.toPlural(attribute.name)}: {attribute.name === 'color'?
                                <span className="ml-2 font-normal text-base">{selectedAttribute.find((attr) => attr.name === attribute.name).attribute}</span> : ''}
                            </div>
                            <ul className="flex items-center my-2 gap-2">
                                {attribute.value?.map((value, key) => (
                                    <li key={key} onClick={() => handleVariantClick(attribute.name, value.attribute)}>
                                        <input
                                            type="radio"
                                            name={attribute.name}
                                            id={`${attribute.name}-${key}`}
                                            value={value.attribute}
                                            className="hidden peer"
                                            checked={selectedAttribute.some(attr => attr.name === attribute.name && attr.attribute === value.attribute)}
                                            onChange={() => {}}
                                            required
                                        />
                                        {value.image_url !== null ?
                                            <img
                                                className="w-8 h-8 rounded-full cursor-pointer p-1 shadow border border-gray-300 transition-opacity duration-300 ease-in-out hover:opacity-75 focus-within:opacity-75 hover:ring-2 peer-checked:ring-2 ring-gray-800 hover:ring-offset-1"
                                                src={value.image_url}
                                                alt={value.attribute}
                                            />
                                            :
                                            <label
                                                className={
                                                "rounded-full cursor-pointer px-2 py-1 transition-opacity duration-300 ease-in-out hover:opacity-75 focus-within:opacity-75 hover:ring-2 peer-checked:ring-2 ring-gray-800 hover:ring-offset-1 shadow "
                                                    + (attribute.name !== 'color' ? "bg-gray-100 border border-gray-300 peer-checked:border-none hover:border-none" : "")
                                            }
                                                htmlFor={`${attribute.name}-${key}`}
                                                style={attribute.name === 'color' ? {
                                                    backgroundColor: colorCodeByName(value.attribute),
                                                    borderColor: colorCodeByName(value.attribute)
                                                } : {}}
                                            >
                                                {value.attribute}
                                            </label>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                <div className="mb-4 xl:mb-8">
                    <div className="mb-2 text-center">
                        <button type="button"
                                disabled={!selectedVariant.is_stocked && !product?.is_stocked}
                                className="w-full px-5 py-2.5 text-lg font-extrabold text-dark bg-white border border-gray-600 hover:bg-gray-100 focus:ring-0 focus:outline-none rounded-full text-center">
                            Add To Cart
                        </button>

                    </div>
                    <div className="mb-2 text-center">
                        <button type="button"
                                disabled={!selectedVariant?.is_stocked && !product?.is_stocked}
                                className="w-full px-5 py-2.5 text-lg font-extrabold text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none rounded-full text-center">
                            Buy Now
                        </button>

                    </div>


                </div>
            </div>
        </section>
    )
}