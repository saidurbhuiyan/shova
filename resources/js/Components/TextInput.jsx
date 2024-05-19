import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', newClassName = null, isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                (newClassName ?? 'border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 outline-none shadow-sm rounded-md')
                + ' ' +
                className
            }
            ref={input}
        />
    );
});
