import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css';

const ZoomImage = ({ img, imageTitle, zoomScale, height, width, transitionTime }) => {
    const [zoom, setZoom] = useState(false);
    const [mouseX, setMouseX] = useState(null);
    const [mouseY, setMouseY] = useState(null);
    const imageRef = useRef(null);

    const handleMouseOver = () => {
        setZoom(true);
    };

    const handleMouseOut = () => {
        setZoom(false);
    };

    const handleMouseMovement = (e) => {
        const { left: offsetLeft, top: offsetTop } = imageRef.current.getBoundingClientRect();
        const { offsetWidth: width, offsetHeight: height } = imageRef.current;

        const x = ((e.pageX - offsetLeft) / width) * 100;
        const y = ((e.pageY - offsetTop) / height) * 100;

        setMouseX(x);
        setMouseY(y);
    };

    const outerDivStyle = {
        height: `${height}px`,
        width: `${width}px`,
    };

    const innerDivStyle = {
        transition: `transform ${transitionTime}s ease-out`,
        transformOrigin: `${mouseX}% ${mouseY}%`,
        transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
    };

    return (
        <div
            className="overflow-hidden w-full h-full"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseMove={handleMouseMovement}
            ref={imageRef}
        >
            <img src={img}
                 alt="image"
                className="m-auto w-full h-full bg-white"
                style={innerDivStyle}
            />
        </div>
    );
};

ZoomImage.propTypes = {
    /** The path to the image. It can be a url. */
    img: PropTypes.string.isRequired,
    /** The zoom scale. */
    zoomScale: PropTypes.number.isRequired,
    /** The height of the image in pixels */
    height: PropTypes.number.isRequired,
    /** The width of the image in pixels */
    width: PropTypes.number.isRequired,
    /** The time (in seconds) that will take to scale your image. */
    transitionTime: PropTypes.number,
};

ZoomImage.defaultProps = {
    transitionTime: 0.1,
};

export default ZoomImage;
