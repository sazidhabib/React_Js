import React from 'react';

export const ChambersModal = ({
    show,
    onClose,
    chambers
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">চেম্বারসমূহ</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {chambers.map((chamber, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                            <h4 className="font-semibold">চেম্বার {index + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {/* Chamber details */}
                                {chamber.chamber_name && (
                                    <p>
                                        <strong>চেম্বারের নাম:</strong> {chamber.chamber_name}
                                    </p>
                                )}
                                {chamber.chamber_address && (
                                    <p>
                                        <strong>চেম্বারের ঠিকানা:</strong>{" "}
                                        {chamber.chamber_address}
                                    </p>
                                )}
                                {chamber.chamber_contact && (
                                    <p>
                                        <strong>চেম্বারের যোগাযোগ নম্বর:</strong>{" "}
                                        {chamber.chamber_contact}
                                    </p>
                                )}
                                {chamber.chamber_date && (
                                    <p>
                                        <strong>কোন কোন দিন খোলা থাকে:</strong>{" "}
                                        {chamber.chamber_date}
                                    </p>
                                )}
                                {chamber.chamber_time && (
                                    <p>
                                        <strong>কয়টা থেকে কয়টা পর্যন্ত খোলা থাকে:</strong>{" "}
                                        {chamber.chamber_time}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};