// components/AdList.js
import React, { useState } from 'react';
import AdFilters from './AdFilters';
import AdTable from './AdTable';
import Pagination from './Pagination';

const AdList = ({
    ads,
    loading,
    filters,
    pagination,
    onEdit,
    onDelete,
    onBulkDelete,
    onFilterChange,
    onPageChange,
    onRefresh
}) => {
    const [selectedAds, setSelectedAds] = useState([]);

    const handleSelectAd = (adId, isSelected) => {
        if (isSelected) {
            setSelectedAds(prev => [...prev, adId]);
        } else {
            setSelectedAds(prev => prev.filter(id => id !== adId));
        }
    };

    const handleSelectAll = (isSelected) => {
        if (isSelected) {
            setSelectedAds(ads.map(ad => ad.id));
        } else {
            setSelectedAds([]);
        }
    };

    const handleBulkDelete = () => {
        if (selectedAds.length === 0) return;
        onBulkDelete(selectedAds);
        setSelectedAds([]);
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">All Ads</h5>
                    <div>
                        <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={onRefresh}
                            disabled={loading}
                        >
                            <i className="fas fa-sync-alt me-1"></i>
                            Refresh
                        </button>
                        {selectedAds.length > 0 && (
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={handleBulkDelete}
                            >
                                <i className="fas fa-trash me-1"></i>
                                Delete Selected ({selectedAds.length})
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="card-body">
                {/* Filters */}
                <AdFilters
                    filters={filters}
                    onFilterChange={onFilterChange}
                    loading={loading}
                />

                {/* Ads Table */}
                <AdTable
                    ads={ads}
                    loading={loading}
                    selectedAds={selectedAds}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSelectAd={handleSelectAd}
                    onSelectAll={handleSelectAll}
                />

                {/* Pagination */}
                <Pagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default AdList;