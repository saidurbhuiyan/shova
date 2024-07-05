import {useEffect, useState} from "react";


/**
 * Capitalize the first letter of each word in a string
 * @param str
 * @param splitter
 * @param joiner
 * @returns {*}
 */
export const uppercase = (str, splitter = ' ', joiner = ' ') => {
    return str
        .split(splitter)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(joiner);
}

/**
 * Get the asset path
 * @param path
 * @returns {*}
 */
export const asset = (path) => {
    return `/storage/${path}`;
}

/**
 * Get the image path
 * @param path
 * @returns {*}
 */
export const image = (path) => {
    return asset(`images/${path}`);
}


/**
 * Get the max on screen size based on the provided sizes
 * @param maxSizes
 * @param defaultSize
 * @returns {unknown}
 */
export const useMaxOnScreenSize = (maxSizes, defaultSize) => {
    const [maxSize, setMaxSize] = useState(defaultSize);
    const defaultScreens = {
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
            Object.entries(defaultScreens).forEach(([ key, screen]) => {
                if (screenWidth <= screen && typeof maxSizes[key] !== "undefined") {
                    setMaxSize(maxSizes[key]);
                }
            });
        };

        handleResize(); // Call initially to set size
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [maxSizes]);

    return maxSize;
};

/**
 * Dispatch an event to notify other components of the cart update
 */
function dispatchCartChangeEvent() {
    window.dispatchEvent(new Event('cartChange'));
}

/**
 * get the all cart products
 * @returns {{quantity: *, id: *}[]}
 */
export const getCartContents = () => {

    return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * checking if product is already on cart or not
 * @param productId
 * @returns {boolean}
 */
export const hasOnCart = (productId) => {
    let cart = getCartContents();
    let productIndex = cart.findIndex(item => item.id === productId);
    return productIndex !== -1
}

/**
 * add to cart by product id in localstorage
 * @param productId
 */
export const addToCart = (productId) => {

    let cart = getCartContents();
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    dispatchCartChangeEvent()
}

/**
 * remove from cart by product id in localstorage
 * @param productId
 */
export const removeFromCart = (productId = null)=> {

    if (!productId){
        localStorage.setItem('cart', JSON.stringify([]))

        dispatchCartChangeEvent()
        return;
    }

    let cart = getCartContents();
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        dispatchCartChangeEvent()
    }
}


export const cartedProductsData = async () => {
    const cartContents = getCartContents();
    const ids = cartContents.map(item => item.id);
    let productData = {}
    await axios.post(route('carted-products.fetch'), {product_ids: ids})
        .then(response => {
            // Handle the JSON data received in the response
            productData = response.data;

        })
        .catch(error => {
            console.error('Error:', error);
        })

    return productData
};
