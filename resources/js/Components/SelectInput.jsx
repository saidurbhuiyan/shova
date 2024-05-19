import { forwardRef, useEffect, useRef } from 'react';
import { uppercase } from '@/helper';

export default forwardRef(function SelectInput({ optionsData = {}, defaultOption = 'Select', className = '', newClassName = null, isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    if (!Array.isArray(optionsData)) {
        optionsData = Object.keys(optionsData).map(key => optionsData[key]);
    }

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                (newClassName ?? 'border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 rounded-md shadow-sm text-sm') + ' ' +
                className
            }
            ref={input}
            value={props.value}
        >
            {defaultOption && <option value="">{defaultOption}</option>}

            {optionsData.map((option) => (
                <option key={option} value={option}>
                    {typeof option === 'string' ? uppercase(option) : option}
                </option>
            ))}

        </select>
    );
});
