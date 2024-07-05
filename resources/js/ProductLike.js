/**
 * Dispatch an event to notify other components of the like update
 */
function dispatchLikeChangeEvent() {
    window.dispatchEvent(new Event('likeChange'));
}

/**
 * get the all like products
 * @returns {{quantity: *, id: *}[]}
 */
export const getLikeContents = () => {

    return JSON.parse(localStorage.getItem('like')) || [];
}

/**
 * checking if product is already on like or not
 * @param productId
 * @returns {boolean}
 */
export const hasOnLike = (productId) => {
    let like = getLikeContents();
    let productIndex = like.findIndex(item => item.id === productId);
    return productIndex !== -1
}

/**
 * add to like by product id in localstorage
 * @param productId
 */
export const addToLike = (productId) => {

    let like = getLikeContents();
    let productIndex = like.findIndex(item => item.id === productId);

    if (productIndex !== -1 || typeof productId === 'undefined'){
        return;
    }

        like.push({ id: productId });
        localStorage.setItem('like', JSON.stringify(like));

        dispatchLikeChangeEvent()


}

/**
 * remove from like by product id in localstorage
 * @param productId
 */
export const removeFromLike = (productId = null)=> {

    if (!productId){
        localStorage.setItem('like', JSON.stringify([]))

        dispatchLikeChangeEvent()
        return;
    }

    let like = getLikeContents();
    let productIndex = like.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        like.splice(productIndex, 1);

        localStorage.setItem('like', JSON.stringify(like));

        dispatchLikeChangeEvent()
    }
}