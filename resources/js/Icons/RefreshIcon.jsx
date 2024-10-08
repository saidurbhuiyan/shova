export default function RefreshIcon({ClassName = null, fill = null, ...props}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill ?? 'none'}
             stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
             className={ClassName ?? 'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 2xl:w-9 2xl:h-9'} {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"/>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>
        </svg>

    )
}