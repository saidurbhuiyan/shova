import {Link} from "@inertiajs/react";

export default function CategoryList({categories}) {
    return (
        <div className="flex flex-wrap gap-2 sm:gap-3 my-6">
            {categories.map((category, index) => (
                <Link key={index} className="px-4 py-1.5 bg-gray-100 text-black rounded-full hover:bg-gray-200" href={route('product.search', {category: category.slug})}>
                    {category.name}
                </Link>
            ))}
        </div>
    );
}