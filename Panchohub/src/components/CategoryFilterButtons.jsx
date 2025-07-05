import React from 'react';

export const CategoryFilterButtons = ({
    categories,
    selectedCategory,
    onCategoryChange,
    slugField = 'slug',
    titleField = 'title'
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category[titleField]}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded ${selectedCategory &&
                                (
                                    selectedCategory[slugField] === category[slugField] ||
                                    selectedCategory[titleField] === category[titleField]
                                )
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {category[titleField]}
                    </button>
                ))}
            </div>
        </div>
    );
};