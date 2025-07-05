import React from 'react';

export const DataGrid = ({
    data,
    renderItem,
    imageLink,
    imagePath,
    attemptedCategory,
    selectedCategory
}) => {
    if (data.length === 0) {
        return (
            <div className="text-center py-10">
                {attemptedCategory ? (
                    <p className="text-sm text-gray-500 mt-2">
                        No results found for "{attemptedCategory.title}"
                    </p>
                ) : (
                    <p>No data found</p>
                )}
            </div>
        );
    }


    return (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition cursor-pointer"
                >
                    <div className="flex justify-center mb-4">
                        <img
                            src={
                                item.image
                                    ? `${imageLink}/${imagePath}/${item.image}`
                                    : "/image/logo-3.png"
                            }
                            alt={item.dr_name || item.title || item.name || "Default"}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-grow">{renderItem(item)}</div>
                </div>
            ))}
        </div>
    );
};