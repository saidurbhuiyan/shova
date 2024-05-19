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
                if (screenWidth <= screen) {
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