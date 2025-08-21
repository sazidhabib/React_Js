import React from 'react';

const DeleteAccountPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Delete Account & Data Policy</h1>
                    <div className="w-20 h-1 bg-red-500 mx-auto"></div>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-700 mb-6">
                        Users can delete their accounts at any time from within the app by going to:
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
                        <p className="font-medium text-gray-800 mb-2">Profile → Settings → Delete Account.</p>
                        <p className="font-medium text-gray-800">প্রোফাইল → সেটিংস  → ডিলিট অ্যাকাউন্ট।</p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-4">When you request account deletion:</h2>
                    <ul className="list-disc text-left pl-6 text-gray-700 mb-8 space-y-2">
                        <li>Your profile and login credentials are permanently removed.</li>
                        <li>All personal data associated with your account will be deleted from our systems.</li>
                        <li>This action cannot be undone - all your data will be permanently lost.</li>
                        <li>Any active subscriptions will be canceled.</li>
                    </ul>

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h3 className="font-semibold text-yellow-800 mb-2">Alternative Deletion Method</h3>
                        <p className="text-gray-700">
                            If you are unable to access the app, you may request deletion by contacting us at:
                        </p>
                        <a
                            href="mailto:support@panchohub.com"
                            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            support@panchohub.com
                        </a>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} PanchoHub. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountPage;