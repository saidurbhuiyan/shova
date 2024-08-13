import { forwardRef, useEffect, useRef } from 'react';
import { uppercase } from '@/helper.ts';

export default forwardRef(function SelectInput({ optionsData = {}, defaultOption = null, className = '', newClassName = null, isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

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

            {Array.isArray(optionsData) ? (
                optionsData.map((option, key) => (
                    <option key={key} value={key}>
                        {typeof option === 'string' ? uppercase(option) : option}
                    </option>
                ))
            ) : (
                Object.entries(optionsData).map(([key, option]) => (
                    <option key={key} value={key}>
                        {typeof option === 'string' ? uppercase(option) : option}
                    </option>
                ))
            )}


        </select>
    );
});
