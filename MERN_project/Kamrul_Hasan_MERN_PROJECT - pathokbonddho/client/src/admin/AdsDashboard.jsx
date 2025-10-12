// components/Ads.js
import React, { useState, useEffect } from 'react';
import AdList from './AdList';
import AdForm from './AdForm';
import { getAds, deleteAd, bulkDeleteAds } from '../services/adService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdsDashboard = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingAd, setEditingAd] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        position: '',
        isActive: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0
    });

    useEffect(() => {
        fetchAds();
    }, [pagination.page, pagination.limit, filters]);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                ...filters
            };
            const response = await getAds(params);
            setAds(response.ads);
            setPagination(prev => ({
                ...prev,
                totalCount: response.totalCount,
                totalPages: response.totalPages
            }));
        } catch (error) {
            toast.error('Failed to fetch ads');
            console.error('Error fetching ads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingAd(null);
        setShowForm(true);
    };

    const handleEdit = (ad) => {
        setEditingAd(ad);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this ad?')) {
            return;
        }

        try {
            await deleteAd(id);
            toast.success('Ad deleted successfully');
            fetchAds();
        } catch (error) {
            toast.error('Failed to delete ad');
            console.error('Error deleting ad:', error);
        }
    };

    const handleBulkDelete = async (adIds) => {
        if (!window.confirm(`Are you sure you want to delete ${adIds.length} ads?`)) {
            return;
        }

        try {
            await bulkDeleteAds(adIds);
            toast.success(`${adIds.length} ads deleted successfully`);
            fetchAds();
        } catch (error) {
            toast.error('Failed to delete ads');
            console.error('Error bulk deleting ads:', error);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingAd(null);
    };

    const handleFormSuccess = () => {
        toast.success(editingAd ? 'Ad updated successfully' : 'Ad created successfully');
        setShowForm(false);
        setEditingAd(null);
        fetchAds();
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Ads Management</h1>
                        <button
                            className="btn btn-primary"
                            onClick={handleCreate}
                        >
                            <i className="fas fa-plus me-2"></i>
                            Create New Ad
                        </button>
                    </div>

                    {/* Ads List */}
                    {!showForm ? (
                        <AdList
                            ads={ads}
                            loading={loading}
                            filters={filters}
                            pagination={pagination}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onBulkDelete={handleBulkDelete}
                            onFilterChange={handleFilterChange}
                            onPageChange={handlePageChange}
                            onRefresh={fetchAds}
                        />
                    ) : (
                        <AdForm
                            ad={editingAd}
                            onClose={handleFormClose}
                            onSuccess={handleFormSuccess}
                        />
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AdsDashboard;