import {useState} from "react";
import { usePage} from "@inertiajs/react";
import RefreshIcon from "@/Icons/RefreshIcon.jsx";
import SliderRange from "@/Components/SliderRange.jsx";

export default function SidebarFilter({ onFilterChange, resetFilter, filters }){
    const [rangeValue, setRangeValue] = useState(filters.priceRangeLast);

    const handleFilterChange = () => {
        onFilterChange({
            priceRangeLast: rangeValue
        });
    };

    return (

        <div
            className="flex flex-col h-full w-full bg-white border border-gray-300/80 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between py-2.5 px-4 bg-black text-white font-bold">
                Filter
                <a href="#" onClick={resetFilter}>
                    <RefreshIcon ClassName="w-5 h-5"/>

                </a>
            </div>
            <div className="flex-grow">
                <div className="border-b border-gray-300/80 p-8">
                    <SliderRange setRangeValue={setRangeValue}
                                 rangeValue={rangeValue}
                    />
                </div>
            </div>

            <div className="px-6 py-4 text-center">
                <button
                    onClick={handleFilterChange}
                    className="bg-gray-800 text-white font-bold py-1.5 px-4 rounded hover:bg-gray-700 transition duration-200">
                    Filter Now
                </button>
            </div>

        </div>

    )
}