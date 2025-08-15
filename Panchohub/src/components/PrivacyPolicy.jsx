import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const PrivacyPolicy = () => {
  const [policyContent, setPolicyContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        console.log("Fetching privacy policy...");
        const response = await axios.get(
          "https://app.panchohub.com/api/privacy_policy"
        );

        console.log("API Response:", response);

        // Handle the array response structure
        if (
          !response.data ||
          !Array.isArray(response.data) ||
          response.data.length === 0
        ) {
          throw new Error("Invalid response format");
        }

        const firstPolicy = response.data[0];
        if (!firstPolicy.description) {
          throw new Error("No description found in response");
        }

        setPolicyContent(firstPolicy.description);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load privacy policy");
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading privacy policy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-red-600">!</span>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            Error Loading Content
          </h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-left">
            <p className="text-xs text-gray-500">Technical details:</p>
            <p className="text-xs font-mono text-gray-700 overflow-x-auto">
              {error.toString()}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>

            {policyContent ? (
              <div
                className="prose prose-gray max-w-none text-left lg:prose-lg m-0"
                dangerouslySetInnerHTML={{ __html: policyContent }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No content available</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-500"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
