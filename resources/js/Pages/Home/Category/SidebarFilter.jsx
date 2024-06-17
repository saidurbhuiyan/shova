export default function SidebarFilter(){
    return (

                    <div
                        className="w-full h-full bg-white border border-gray-300/80 border-b-[10px] border-b-black rounded-lg overflow-hidden">
                            <a className="flex items-center justify-between py-2.5 px-4 bg-black text-white font-bold"
                               href="#">
                                Filter
                                <span>
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
<path
    d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
    stroke="#FF6666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                              </span>
                            </a>
                        <div className="border-b border-gray-300/80">
                            <a className="flex items-center justify-between py-2 px-4 text-black gap-2 font-bold"
                               href="#">
                                Brands
                                <span>
                                 <div className="icon-box flex gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
<path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="black" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round"/>
</svg>


                                 </div>
                              </span>
                            </a>
                        </div>
                        <div className="border-b border-gray-300/80">
                            <div className="py-2 px-4 text-black">
                                <div className="flex items-center justify-between">
                                    <p className="text-md font-bold"> For </p>
                                    <div className="flex gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="black" strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full m-auto mt-2">
                                        <div className="mx-8 mb-2">
                                        <div className="flex gap-2 items-center justify-between">
                                            <p className="text-sm text-black">Gents</p>
                                            <input id="default-checkbox" type="checkbox"
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        </div>
                                        </div>
                                        <div className="mx-8 mb-2">
                                            <div className="flex gap-2 items-center justify-between">
                                                <p className="text-sm text-black">Ladies</p>
                                            <input id="default-checkbox" type="checkbox" value=""
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        </div>
                                        </div>

                                        <div className="mx-8 mb-2">
                                            <div className="flex gap-2 items-center justify-between">
                                                <p className="text-sm text-black">Unisex</p>
                                            <input id="default-checkbox" type="checkbox" value=""
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        </div>
                                    </div>
                                        </div>
                                </div>
                            </div>
                        <div className="pb-20">
                            <div className="py-2 px-4 text-black">
                                <div className="flex items-center justify-between">
                                    <p className="text-md text-black font-bold"> Others </p>
                                    <div className="flex gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="black" strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full m-auto mt-2">
                                    <div className="mx-8 mb-2">
                                        <div className="flex gap-2 items-center justify-between">
                                            <p className="text-sm text-black">Hair Perfume</p>
                                            <input id="default-checkbox" type="checkbox" value=""
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        </div>
                                    </div>
                                    <div className="mx-8 mb-2">
                                        <div className="flex gap-2 items-center justify-between">
                                            <p className="text-sm text-black">Beard Perfume</p>
                                            <input id="default-checkbox" type="checkbox" value=""
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

    )
}