/**
 * Dispatch an event to notify other components of the like update
 */
function dispatchLikeChangeEvent(): void {
    window.dispatchEvent(new Event('likeChange'));
}

/**
 * Interface representing a product in the like list
 */
interface LikeProduct {
    id: string;
    quantity?: number;
}

/**
 * Get all liked products
 * @returns {LikeProduct[]}
 */
export const getLikeContents = (): LikeProduct[] => {
    return JSON.parse(localStorage.getItem('like') || '[]');
}

/**
 * Check if a product is already liked or not
 * @param productId - The ID of the product to check
 * @returns {boolean}
 */
export const hasOnLike = (productId: string): boolean => {
    const like = getLikeContents();
    const productIndex = like.findIndex(item => item.id === productId);
    return productIndex !== -1;
}

/**
 * Add a product to the liked list by product ID in localStorage
 * @param productId - The ID of the product to add
 */
export const addToLike = (productId: string): void => {
    if (!productId) return; // Prevent adding undefined or empty IDs

    const like = getLikeContents();
    const productIndex = like.findIndex(item => item.id === productId);

    if (productIndex !== -1) return; // Product already liked

    like.push({ id: productId });
    localStorage.setItem('like', JSON.stringify(like));
    dispatchLikeChangeEvent();
}

/**
 * Remove a product from the liked list by product ID in localStorage
 * @param productId - The ID of the product to remove, or null to clear all likes
 */
export const removeFromLike = (productId: string | null = null): void => {
    if (productId === null) {
        localStorage.setItem('like', JSON.stringify([]));
        dispatchLikeChangeEvent();
        return;
    }

    const like = getLikeContents();
    const productIndex = like.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        like.splice(productIndex, 1);
        localStorage.setItem('like', JSON.stringify(like));
        dispatchLikeChangeEvent();
    }
}
