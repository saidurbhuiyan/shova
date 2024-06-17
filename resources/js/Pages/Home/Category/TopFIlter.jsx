import SelectInput from "@/Components/SelectInput.jsx";

export default function TopFilter(){
    return (
        <div>
            <div className="lg:flex justify-between gap-2">
                <div className="border border-gray-300/80 bg-white w-full lg:w-8/12 rounded-lg">
                    <div className="sm:grid sm:grid-cols-12">
                        <div
                            className="col-span-3 flex items-center justify-center sm:justify-between gap-4 py-2 border-b border-gray-300/80 sm:border-0 sm:mx-4">
                            <p className="text-md sm:text-sm md:text-md text-black">Price Range</p>
                            <svg className="hidden lg:block" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.25 4.5L15.75 12L8.25 19.5" stroke="black" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <svg className="block lg:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="black" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>

                        </div>
                        <div className="col-span-6 border-b border-gray-300/80 sm:border-0">
                            <div className="flex items-center justify-between h-full">
                                <div className="relative sm:border-l border-gray-300/80 h-full">
                                <input type="number" name="range-first"
                                               className="block w-full h-full py-2 pe-8 border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 outline-none shadow-none text-md sm:text-sm md:text-md text-blue-500"
                                               defaultValue="500"/>
                                        <div
                                            className="absolute text-md sm:text-sm md:text-md inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-2 text-blue-500">
                                            TK
                                        </div>
                                    </div>
                                <div className="py-2 px-3 inline-flex items-center w-fit text-md sm:text-sm md:text-md text-gray-500 -mt-px -ms-px sm:w-auto">

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 15.75L18.75 12L15 8.25M9 15.75L5.25 12L9 8.25" stroke="#C7C7C7"
                                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                </div>
                                <div className="relative h-full">
                                    <input type="number" name="range-last"
                                           className="block w-full h-full py-2 pe-8 border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 outline-none shadow-none text-md sm:text-sm md:text-md text-blue-500"
                                           defaultValue="50000"/>
                                    <div
                                        className="absolute text-md sm:text-sm md:text-md inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-2 text-blue-500">
                                        TK
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 item-nice-select border-s focus:border-gray-300/80">
                            <SelectInput id="price"
                                         newClassName="w-full h-full shadow-none bg-transparent text-md sm:text-sm md:text-md border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 text-center"
                                         optionsData={{
                                             'lh': 'Low - High',
                                             'hl': 'High - Low',
                                         }}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 flex items-center justify-center my-2 lg:my-0">
                    <input
                        className="block w-10/12 lg:w-full rounded-full py-2 border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 outline-none shadow-sm text-md sm:text-sm md:text-md font-bold"
                        type="search" placeholder="Search here..."/>
                </div>
            </div>
            <div className="sm:flex mt-2 gap-4 lg:gap-0 items-center justify-between text-md sm:text-sm md:text-md">
                        <ul className="flex gap-2 flex-wrap text-slate-500 mb-2 sm:mb-0">
                            <li><a className="border border-slate-400/20 bg-blue-200/20 px-2 py-0.5 rounded-full inline-block"
                                   href="#"> Victoria </a></li>
                            <li><a className="border border-slate-400/20 bg-blue-200/20 px-2 py-0.5 rounded-full inline-block"
                                   href="#"> Miss Dior </a></li>
                            <li><a className="border border-slate-400/20 bg-blue-200/20 px-2 py-0.5 rounded-full inline-block"
                                   href="#"> Miniso</a></li>
                            <li><a className="border border-slate-400/20 bg-blue-200/20 px-2 py-0.5 rounded-full inline-block"
                                   href="#"> Armani </a></li>
                        </ul>
                      <div className="flex gap-2 items-center lg:justify-end border border-black px-2 py-0.5">
                                <input type="checkbox" value="false"
                                       className="w-4 h-4 bg-gray-100 border-black rounded focus:ring-blue-500"/>
                                <p className="text-black uppercase">On Offer</p>
                            </div>

            </div>
        </div>
    )
}