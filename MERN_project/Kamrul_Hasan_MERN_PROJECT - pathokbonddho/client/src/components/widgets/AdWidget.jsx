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
                const response = await axios.get(`${API_BASE_URL}/api/ads/${cell.contentId}`);
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
    const adLink = ad.imageUrl || ad.link || ad.url || '#';
    const imgSrc = adImage
        ? (adImage.startsWith('http') ? adImage : `${API_BASE_URL}/uploads/${adImage}`)
        : null;

    if (ad.type === 'google_adsense') {
        return (
            <div className="ad-widget h-100 w-100 d-flex flex-column align-items-center justify-content-center overflow-hidden">
                {ad.headCode && <div dangerouslySetInnerHTML={{ __html: ad.headCode }} />}
                {ad.bodyCode && <div dangerouslySetInnerHTML={{ __html: ad.bodyCode }} />}
            </div>
        );
    }

    const content = (
        <div className="ad-widget h-100  overflow-hidden" style={{ backgroundColor: '#ffffffff' }}>
            {imgSrc && (
                <div style={{ overflow: 'hidden' }}>
                    <img
                        src={imgSrc}
                        alt={adTitle}
                        className="w-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
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
