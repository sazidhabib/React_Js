import React from "react";

export const CardDetailsModal = ({ show, onClose, item, slug }) => {
    if (!show || !item) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{item.name || item.title || item.shopName}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name || item.title}
                                    className="w-full h-auto rounded-lg"
                                />
                            )}
                        </div>
                        <div>
                            {/* Render details based on the slug */}
                            {slug === "doctors" && (
                                <>
                                    <p><strong>Specialty:</strong> {item.category}</p>
                                    <p><strong>Degree:</strong> {item.degree}</p>
                                    <p><strong>Experience:</strong> {item.experience}</p>
                                    <p><strong>Phone:</strong> {item.phone}</p>
                                    <p><strong>Email:</strong> {item.email || 'N/A'}</p>
                                </>
                            )}

                            {slug === "shopping" && (
                                <>
                                    <p><strong>Category:</strong> {item.category}</p>
                                    <p><strong>Address:</strong> {item.address}</p>
                                    <p><strong>Phone:</strong> {item.phone}</p>
                                    <p><strong>Description:</strong> {item.description || 'N/A'}</p>
                                </>
                            )}

                            {/* Add more conditions for other slugs as needed */}
                            {!["doctors", "shopping"].includes(slug) && (
                                <div>
                                    {Object.entries(item).map(([key, value]) => (
                                        <p key={key}><strong>{key}:</strong> {value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Show chambers for doctors */}
                    {slug === "doctors" && item.chambers && item.chambers.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">Chambers</h3>
                            <ul className="space-y-2">
                                {item.chambers.map((chamber, index) => (
                                    <li key={index} className="border-b pb-2">
                                        <p><strong>Hospital:</strong> {chamber.hospital}</p>
                                        <p><strong>Address:</strong> {chamber.address}</p>
                                        <p><strong>Visiting Hours:</strong> {chamber.visitingHours}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};