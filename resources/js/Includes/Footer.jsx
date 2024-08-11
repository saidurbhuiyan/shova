import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {image} from "@/helper.ts";
import {Link} from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="pt-[25px] pb-12 lg:mt-[200px] mt-[80px] border-t border-gray-400">
            <div className="w-full max-w-[1440px]">
                <div
                    className="flex justify-between flex-nowrap">
                    <div className="w-full max-w-[400px] border-r border-gray-300">
                            <div className="h-full flex justify-center md:justify-start items-center md:items-start md:pt-8">
                                <ApplicationLogo className="block h-4 sm:h-5 lg:h-6 2xl:h-8 w-auto"/>
                            </div>
                    </div>
                    <div className="border-r border-gray-300 px-2 md:px-4 lg:px-8 w-full max-w-[320px]">
                        <div className="h-full flex justify-center md:justify-start items-center md:items-start md:pt-8">
                            <ul className="flex flex-col gap-2 md:gap-4 text-xs md:text-sm lg:text-md">
                                <li><Link href="#">About US</Link></li>
                                <li><Link href="#">Contact US</Link></li>
                                <li><Link href="#">Privacy & Policies</Link></li>
                                <li><Link href="#">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-r border-gray-300 px-2 md:px-4 lg:px-8 max-w-[300px] w-full hidden md:block">
                        <div className="h-full flex justify-start items-start pt-8">
                        <div>
                            <h3 className="text-md font-extrabold">Payment Methods</h3>
                            <ul className="flex gap-4 pt-4 flex-wrap">
                                <li><Link href="#">Bkash</Link></li>
                                <li><Link href="#">Nagad</Link></li>
                                <li><Link href="#">Rocket</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="px-2 md:px-4 lg:px-8 pr-0 max-w-[280px] w-full">
                        <div className="h-full flex justify-center md:justify-start items-center md:items-start md:pt-8">
                            <div>
                                <h3 className="text-sm md:text-md lg:text-lg font-extrabold">Support</h3>
                            <ul className="flex flex-col gap-2 pt-2 md:pt-4 text-xs md:text-sm lg:text-md">
                                <li><Link href="tell:0185441425252">Mobile : 0185441425252</Link></li>
                                <li><Link href="mailto:Support@shova.com.bd">Mail : Support@shova.com.bd</Link></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 md:px-4 lg:px-8 xl:pr-0 max-w-[140px] w-full">
                        <ul className="flex gap-4 xl:justify-end">
                            <li>
                                <Link href="#">
                                    <svg className="h-4 sm:h-5 lg:h-6 2xl:h-8 w-auto" viewBox="0 0 26 25" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="25.3646" height="25" fill="url(#pattern0_10_301)"/>
                                        <defs>
                                            <pattern id="pattern0_10_301" patternContentUnits="objectBoundingBox"
                                                     width="1" height="1">
                                                <use xlinkHref="#image0_10_301"
                                                     transform="matrix(0.01 0 0 0.0101458 0 -0.00729168)"/>
                                            </pattern>
                                            <image id="image0_10_301" width="100" height="100"
                                                   xlinkHref="data:image/png;base64,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"/>
                                        </defs>
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <svg className="h-4 sm:h-5 lg:h-6 2xl:h-8 w-auto" viewBox="0 0 31 30" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect x="0.539062" width="30.4375" height="30" fill="url(#pattern0_10_299)"/>
                                        <defs>
                                            <pattern id="pattern0_10_299" patternContentUnits="objectBoundingBox"
                                                     width="1" height="1">
                                                <use xlinkHref="#image0_10_299"
                                                     transform="matrix(0.01 0 0 0.0101458 0 -0.00729167)"/>
                                            </pattern>
                                            <image id="image0_10_299" width="100" height="100"
                                                   xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAA3VJREFUeAHtnTmLFUEURj9FU5dYQcTEEWPRXAXNNdZUswncQsFQI0MXXEETBSMxER1E1ERF/BeCmYkLN5jh0q+n+nZPd1VJn4Zm3pte3rxz6rtV/ZYpiQUCEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAQEECByRdlnRX0tOZrfac7bkvFeS/9tDbJT2W9EfS35mvxuChpG1rdDLfMBlfZy6hrRF+LiXFktH2B/E76UHmcMj6DMrU+g3S2GTtU66Qjs7qcClnSmxkQWlKM7idU4gNbRGSZmCMsi0IScuwxoqQylKLEIR0x3bO/QwJISH/f0J+SPoi6bWkZ5KeS3ol6Y2kT5K+Sfo5UDQJCYL7IOm8pIOSNgXHpbuC5/YlGiEd0D5KOhoU0NxtR8e5vYjV2whJQLspaWuTco/7CEnAXW2B0Z8mY6MLQkYS8l7Slo3akISQkYQcGkGGnQIhIwh5O5IMhIwgw/qX0wip50LR3rHbiZB6hNgVdt9ln6QTkk61rGcGpJbrEAftTg8beyStuGOjw+mu/RDioF4NCrEh8VQfZUKIE7IcFHLSHdPV4vtuR4iDezYo5Jo7pi/wrv0R4uBaxxxZ7rljugD33Y4QBzcq5Ik7pi/wrv0R4uBGhRi0LrBDtyPEwUWIgzG0RY15HEIyCXkX/DLQ4UiPLsmGx1ZautaXA57fLEpWtOUHfYR3O46Q9s62lJBzCKlLyA2E1CXkBULqEvIdIfUI2SzpF0LqEbJ3gAy7pmLYGx7E9tvxGELa02GtrsSwd8iQdzYJud7yfrdJaq67gyE40nJs81z2qfghL+vMomRFwUSTZNCi5+y7H0IcXIQ4GH1b0hT7IwQhC6WPkuUaBQlxMKYoQX3PiRCEULJSqSEhJISEkBD3csSUV7gp0NFtlCxKFiUrlRYSQkJICAmhU19IQapR8FqWK5v0IQ5GqtXk2oYQhCyUM0qWaxQkxMHIVZZSj4MQhFCySIi7DrF/XZECUnpbDSXrluM1+c3ap6uoQUjW6SpsspKaJ3QpLeS3pP2Tx6LxAI8qLlulhdxvsMpy12Yjs/8KXbq/aHv8kkKKTQpm1k2KTRVXW/kqIcTKlCWj2LR5PobWp1ysaGLJsb+nbi+DrLfa9E8XSvQZXgC3IQABCEAAAhCAAAQgAAEIQAACEIAABCAAgZkT+AcRnWDmmUJOoQAAAABJRU5ErkJggg=="/>
                                        </defs>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden md:block footer-bottom-box pt-12">
                    <div className="main-box flex flex-wrap sm:flex-nowrap gap-3">
                        <div className="item-box min-w-[180px]">
                            <h4 className="text-xl font-extrabold">Popular Searches</h4>
                        </div>
                        <div className="tag-box">
                            <ul className="flex gap-4 flex-wrap">
                                <li><Link href="#">perfume,</Link></li>
                                <li><Link href="#">key chain,</Link></li>
                                <li><Link href="#">cute key chain,</Link></li>
                                <li><Link href="#">dior perfume,</Link></li>
                                <li><Link href="#">girls school bags,</Link></li>
                                <li><Link href="#">girls school bags in bd,</Link></li>
                                <li><Link href="#">key chain,</Link></li>
                                <li><Link href="#">cute key chain,</Link></li>
                                <li><Link href="#">dior perfume,</Link></li>
                                <li><Link href="#">girls school bags,</Link></li>
                                <li><Link href="#">girls school bags in bd,</Link></li>
                                <li><Link href="#">perfume,</Link></li>
                                <li><Link href="#">key chain,</Link></li>
                                <li><Link href="#">cute key chain,</Link></li>
                                <li><Link href="#">dior perfume,</Link></li>
                                <li><Link href="#">girls school bags,</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}