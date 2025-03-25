import React from "react";

const AdminDashboard = () => {
    // Dummy counts (Replace with actual data from API or context)
    const blogPostCount = 12;
    const articlePostCount = 8;

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Dashboard</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Overview</li>
            </ol>

            <div className="row">
                {/* Blog Post Counter */}
                <div className="col-xl-6 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">
                            <h4>Blog Posts</h4>
                            <h2>{blogPostCount}</h2>
                        </div>
                    </div>
                </div>

                {/* Article Post Counter */}
                <div className="col-xl-6 col-md-6">
                    <div className="card bg-success text-white mb-4">
                        <div className="card-body">
                            <h4>Article Posts</h4>
                            <h2>{articlePostCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
