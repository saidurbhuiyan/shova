import SelectInput from "@/Components/SelectInput.jsx";
import {usePage} from "@inertiajs/react";
import {getUrlParam} from "@/helper.ts";

export default function TopFilter({ onFilterChange, filters }){
    const props = usePage().props
    const selectedCategory = props.categories.find((category) => category.slug === getUrlParam('category'))
    return (
          <div className="border border-gray-300/80 bg-white w-full rounded-lg">
              <div className="grid grid-rows-4 md:grid-rows-2 lg:grid-rows-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-9 xl:grid-cols-12">
                  <div
                      className="col-span-2 xl:col-span-4 flex items-center justify-center md:justify-between gap-4 border-b border-gray-300/80 lg:border-0 sm:px-4">
                      <p className="text-md text-black font-extrabold">{selectedCategory?.name ?? 'All'}</p>

                  </div>

                  <div className="col-span-2 lg:col-span-3 xl:col-span-4 flex justify-center md:justify-end border-b border-gray-300/80 lg:border-0">
                      <div className="flex gap-4 items-center item-nice-select h-full px-2 py-0.5">
                          <p className="text-black capitalize font-bold">In Stock</p>
                          <input type="checkbox" checked={filters.inStock}
                                 onChange={() => onFilterChange({inStock: !filters.inStock})}
                                 className="w-3 h-3 bg-gray-100 border-2 border-gray-400 focus:ring-blue-500"/>
                      </div>
                      <div className="flex gap-4 items-center item-nice-select h-full px-2 py-0.5">
                          <p className="text-black capitalize font-bold">On Offer</p>
                          <input type="checkbox" checked={filters.onOffer}
                                 onChange={() => onFilterChange({onOffer: !filters.onOffer})}
                                 className="w-3 h-3 bg-gray-100 border-2 border-gray-400 focus:ring-blue-500"/>
                      </div>
                  </div>

                  <div
                      className="col-span-2 item-nice-select flex flex-grow items-center lg:border-s border-b border-gray-300/80 lg:border-b-0 px-2">
                      <span className="text-black capitalize">Shows: </span>
                      <div className="p-2 w-full">
                          <SelectInput id="per-page"
                                       newClassName="w-full h-full shadow-none bg-gray-100 rounded text-md sm:text-sm md:text-md border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 text-center"
                                   optionsData={{
                                       14: '14',
                                       24: '24',
                                       54: '54',
                                       104: '104',
                                   }}
                                   value={filters.perPage}
                                   onChange={(e) => onFilterChange({perPage: e.target.value})}
                      />
                      </div>
                  </div>

                  <div className="col-span-2 item-nice-select border-s border-b border-gray-300/80 lg:border-b-0">
                      <SelectInput id="price"
                                   newClassName="w-full h-full shadow-none bg-transparent text-md sm:text-sm md:text-md border-0 focus:border-0 focus:ring-0 focus:ring-offset-0 text-center"
                                   optionsData={{
                                       '': 'Default',
                                       'asc': 'Low - High',
                                       'desc': 'High - Low',
                                   }}
                                   value={filters.sortOrder}
                                   onChange={(e) => onFilterChange({sortOrder: e.target.value})}
                      />
                  </div>
              </div>
          </div>
    )
}