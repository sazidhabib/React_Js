import React from 'react';
import { ArrowRight } from 'lucide-react';

const FrameCard = ({
    title,
    subtitle,
    image,
    categoryBadge
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                {categoryBadge && (
                    <div className="absolute top-2 right-2 z-10">
                        <img src={categoryBadge} alt="badge" className="w-8 h-8" />
                    </div>
                )}

                {/* Frame Image Container - Scaling effect on hover */}
                <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    {image ? (
                        <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
                    ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-green-600 border-dashed flex items-center justify-center bg-gray-100 text-gray-400">
                            Frame
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
                {subtitle && <p className="text-xs text-gray-500 mb-3">{subtitle}</p>}

                <button className="w-full mt-2 py-2 px-4 rounded-lg bg-white border border-green-600 text-green-700 font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                    ফ্রেম তৈরি করুন
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default FrameCard;
