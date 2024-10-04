import React, { useState } from 'react';
import {usePage} from "@inertiajs/react";

export default function SliderRange({setRangeValue, rangeValue = 0, min = 0, max = 1000, step = 1, title = null}) {
    const [value, setValue] = useState(rangeValue);
    const [thumbPosition, setThumbPosition] = useState(((value-min) / (max-min)));


    const handleChange = (e) => {
        setValue(e.target.value);
        setThumbPosition(((e.target.value-min) / (max-min)));
        setRangeValue(e.target.value);

    };

    return (
        <div>
            <div className="relative flex items-center">
                {/* Tooltip */}
                <div
                    className="absolute top-[-1.9rem] transform -translate-x-2/3 px-2 py-1 text-white bg-gray-600 rounded-md text-xs text-nowrap"
                    style={{left: `calc(${thumbPosition * 100}% + ${6 - (thumbPosition * 6)}%)`}}
                >
                    {value+' '+ usePage().props.currency_name}
                </div>
                {/* Range Slider */}
                <input
                    id="slide-range"
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    step={step}
                    onChange={handleChange}
                    className="w-full h-1 rounded-lg cursor-pointer"
                    style={{
                        backgroundSize: `${thumbPosition}% 100%`,
                        background: 'linear-gradient(to right, rgb(45 212 191) 0%, rgb(20 184 166) ' + (thumbPosition * 100) + '%, rgb(63 63 70) ' + (thumbPosition * 100) + '%, rgb(63 63 70) 100%)',
                        transition: 'background 450ms ease-in',
                        appearance: 'none',
                    }}
                />
            </div>
            <label htmlFor="slide-range" className="block text-xs font-light text-gray-500 mt-1 capitalize">{title ?? 'select price range'}</label>
        </div>
    );
};


