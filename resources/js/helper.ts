import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Capitalize the first letter of each word in a string
 * @param str - The string to capitalize
 * @param splitter - The delimiter to split the string (default: ' ')
 * @param joiner - The delimiter to join the string (default: ' ')
 * @returns The capitalized string
 */
export const uppercase = (str: string, splitter: string = ' ', joiner: string = ' '): string => {
    return str
        .split(splitter)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(joiner);
}

/**
 * Get the asset path
 * @param path - The path to the asset
 * @returns The full asset path
 */
export const asset = (path: string): string => {
    return `/storage/${path}`;
}

/**
 * Get the image path
 * @param path - The path to the image
 * @returns The full image path
 */
export const image = (path: string): string => {
    return asset(`images/${path}`);
}

/**
 * Get the max on screen size based on the provided sizes
 * @param maxSizes - Object containing screen size names and their corresponding values
 * @param defaultSize - Default size to be used
 * @returns The maximum size based on the screen width
 */
export const useMaxOnScreenSize = (maxSizes: { [key: string]: number }, defaultSize: number): number => {
    const [maxSize, setMaxSize] = useState<number>(defaultSize);
    const defaultScreens: { [key: string]: number } = {
        '2xl': 1536,
        'xl': 1280,
        'lg': 1024,
        'md': 768,
        'sm': 640,
    };

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setMaxSize(defaultSize);
            Object.entries(defaultScreens).forEach(([key, screen]) => {
                if (screenWidth <= screen && maxSizes[key] !== undefined) {
                    setMaxSize(maxSizes[key]);
                }
            });
        };

        handleResize(); // Call initially to set size
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [maxSizes, defaultSize]);

    return maxSize;
}

/**
 * Dispatch an event to notify other components of the cart update
 */
function dispatchCartChangeEvent(): void {
    window.dispatchEvent(new Event('cartChange'));
}

/**
 * Get all cart products
 * @returns Array of cart products
 */
export const getCartContents = (): { id: string; quantity: number }[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

/**
 * Check if a product is already in the cart or not
 * @param productId - The ID of the product to check
 * @returns True if the product is in the cart, otherwise false
 */
export const hasOnCart = (productId: string): boolean => {
    const cart = getCartContents();
    return cart.some(item => item.id === productId);
}

/**
 * Add to cart by product ID in localStorage
 * @param productId - The ID of the product to add
 */
export const addToCart = (productId: string): void => {
    const cart = getCartContents();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    dispatchCartChangeEvent();
}

/**
 * Remove from cart by product ID in localStorage
 * @param productId - The ID of the product to remove, or null to clear all items
 */
export const removeFromCart = (productId: string | null = null): void => {
    if (productId === null) {
        localStorage.setItem('cart', JSON.stringify([]));
        dispatchCartChangeEvent();
        return;
    }

    const cart = getCartContents();
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        dispatchCartChangeEvent();
    }
}

/**
 * Fetch data for carted products
 * @returns A promise resolving to the product data
 */
export const cartedProductsData = async (): Promise<any> => {
    const cartContents = getCartContents();
    const ids = cartContents.map(item => item.id);
    let productData: any = {};

    try {
        const response = await axios.post(route('carted-products.fetch'), { product_ids: ids });
        productData = response.data;
    } catch (error) {
        console.error('Error:', error);
    }

    return productData;
}

/**
 * Get color code by name
 * @param name - The name of the color
 * @returns The color object with code and name, or null if not found
 */
export const colorCodeByName = (name: string): { code: string; name: string } | null => {
    const colors: { [key: string]: { code: string; name: string } } = {
        red: { code: "#FF0000", name: "red" },
        green: { code: "#00FF00", name: "green" },
        blue: { code: "#0000FF", name: "blue" },
        yellow: { code: "#FFFF00", name: "yellow" },
        cyan: { code: "#00FFFF", name: "cyan" },
        magenta: { code: "#FF00FF", name: "magenta" },
        black: { code: "#000000", name: "black" },
        white: { code: "#FFFFFF", name: "white" },
        gray: { code: "#808080", name: "gray" },
        orange: { code: "#FFA500", name: "orange" },
        purple: { code: "#800080", name: "purple" },
        pink: { code: "#FFC0CB", name: "pink" },
        brown: { code: "#A52A2A", name: "brown" },
        lime: { code: "#00FF00", name: "lime" },
        navy: { code: "#000080", name: "navy" },
        gold: { code: "#FFD700", name: "gold" },
        silver: { code: "#C0C0C0", name: "silver" },
        maroon: { code: "#800000", name: "maroon" },
        olive: { code: "#808000", name: "olive" },
        teal: { code: "#008080", name: "teal" }
    };

    return colors[name.toLowerCase()] || null;
}

/**
 * Map product variant attributes to attribute objects
 * @param variant
 * @param isSingle
 * @returns Array
 */
export const mapAttributes = (variant : Array<any>, isSingle : boolean = false) : Array<any> => {
    if (!Array.isArray(variant)) {
        variant = Array(variant);
    }

    return variant.reduce((acc, variant) => {
        variant.attributes.forEach(({ name, value, image_url }) => {
            let attribute = acc.find((attr: { name: any; }) => attr.name === name);
            if (!attribute) {
                attribute = isSingle ? { name, attribute: value } : { name, value: [] };
                acc.push(attribute);
            }

            if (!isSingle && !attribute.value.some((val: { attribute: any; }) => val.attribute === value)) {
                attribute.value.push({ attribute: value, image_url: image_url });
            }
        });
        return acc;
    }, [])
}

export  const  isMobile = (): boolean => Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;
