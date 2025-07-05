import React from 'react';

export const FeatureHeader = ({ feature, selectedCategory, location }) => (
    <div className="flex items-center gap-4 mb-8">
        {feature.icon && (
            <img
                src={feature.icon}
                alt={`${feature.title} Icon`}
                className="h-12 w-12 object-contain"
            />
        )}
        <h1 className="text-3xl font-bold">
            {selectedCategory?.title ||
                location.state?.filterCategory ||
                feature.title}
        </h1>
    </div>
);