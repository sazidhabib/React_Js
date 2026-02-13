import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdWidget = ({ cell }) => {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchAd = async () => {
            if (!cell.contentId) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/api/ad/${cell.contentId}`);
                setAd(response.data.data || response.data);
            } catch (err) {
                console.error('Error fetching ad widget data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [cell.contentId, API_BASE_URL]);

    if (loading) {
        return (
            <div className="text-center p-3">
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!ad) return null;

    const adImage = ad.image;
    const adTitle = ad.title || ad.name || cell.contentTitle || 'Advertisement';
    const adLink = ad.link || ad.url || '#';
    const imgSrc = adImage
        ? (adImage.startsWith('http') ? adImage : `${API_BASE_URL}/uploads/${adImage}`)
        : null;

    const content = (
        <div className="ad-widget h-100 border rounded overflow-hidden" style={{ backgroundColor: '#fffdf5' }}>
            {imgSrc && (
                <div style={{ overflow: 'hidden' }}>
                    <img
                        src={imgSrc}
                        alt={adTitle}
                        className="w-100"
                        style={{ objectFit: 'cover', maxHeight: '300px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
            )}
            {adTitle && (
                <div className="p-2">
                    <p className="small mb-0 fw-bold">{adTitle}</p>
                    {ad.description && (
                        <p className="small text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                            {ad.description.substring(0, 80)}{ad.description.length > 80 ? '...' : ''}
                        </p>
                    )}
                </div>
            )}
        </div>
    );

    // Wrap in a link if URL exists
    if (adLink && adLink !== '#') {
        return (
            <a href={adLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                {content}
            </a>
        );
    }

    return content;
};

export default AdWidget;
