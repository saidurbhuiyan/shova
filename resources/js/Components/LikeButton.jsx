import {addToLike, hasOnLike, removeFromLike} from "@/ProductLike.ts";
import {useState} from "react";

export default function LikeButton({productId = null, className = '', ...props}){
    const [hasLike, setHasLike] = useState(hasOnLike(productId))
    const isDisabled = productId === null
    window.addEventListener('likeChange', function(event) {
        setHasLike(hasOnLike(productId))
    });

    const updateLike = (e, isRemoved = false) => {
        if (isDisabled)
            return;
        e.preventDefault();
        isRemoved ? removeFromLike(productId) : addToLike(productId)
    }
    return (
        <>
        {hasLike ?
                <button
                    {...props}
                    className={className}
                    onClick={(e)=> updateLike(e,true)}
                    disabled={isDisabled}
                >
                    <svg className="ml-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                         viewBox="0 0 24 24"
                         fill="#FF6767">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"/>
                    </svg>
                </button>
                :
                <button
                    {...props}
                    className={className}
                    onClick={(e)=> updateLike(e)}
                    disabled={isDisabled}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round"
                         className="ml-auto">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                    </svg>
                </button>
        }
        </>
    )
}