export default function LoveIcon({ClassName = null, fill = null, ...props}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"
             className={ClassName ?? 'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 2xl:w-9 2xl:h-9'} {...props}
        >

            <g transform="translate(0,96) scale(0.1,-0.1)"
               fill={fill ?? '#333333'} stroke="none">
                <path d="M199 812 c-77 -40 -114 -102 -114 -191 0 -56 6 -76 34 -129 48 -88
141 -194 254 -287 54 -44 102 -80 107 -80 20 0 204 160 264 230 83 98 127 181
133 253 4 49 1 65 -24 112 -67 128 -231 158 -344 63 l-30 -26 -22 21 c-69 65
-174 78 -258 34z m159 -67 c20 -9 56 -35 80 -58 l42 -41 43 41 c74 73 147 91
208 50 71 -47 84 -119 38 -214 -24 -49 -266 -303 -289 -303 -23 0 -265 254
-289 304 -47 98 -33 170 41 216 40 24 76 25 126 5z"/>
            </g>
        </svg>
    )
}