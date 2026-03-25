"use client";
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const AdWidget = ({ cell }) => {
    const [ad, setAd] = useState(cell.resolvedContent || null);
    const [loading, setLoading] = useState(!cell.resolvedContent);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    // Detect current page context safely
    const currentPage = useMemo(() => {
        if (typeof window === 'undefined') return 'home';
        const path = window.location.pathname;
        if (path === '/') return 'home';
        if (path.startsWith('/news/')) return 'details';
        return path.split('/')[1] || 'unknown';
    }, []);

    // Parse displayPages from the ad data
    const displayPages = useMemo(() => {
        if (!ad || !ad.displayPages) return [];
        let pages = ad.displayPages;
        if (typeof pages === 'string') {
            try {
                pages = JSON.parse(pages);
                if (typeof pages === 'string') {
                    pages = JSON.parse(pages);
                }
            } catch (e) {
                console.warn('Could not parse displayPages:', ad.displayPages);
                return [];
            }
        }
        return Array.isArray(pages) ? pages : [];
    }, [ad]);

    // Check if ad should be visible on current page
    const shouldShowAd = useMemo(() => {
        if (!ad) return false;
        if (currentPage === 'details') {
            return displayPages.includes('details');
        }
        if (displayPages.length === 0) return true;
        if (displayPages.includes('none')) return false;
        return displayPages.includes(currentPage);
    }, [ad, displayPages, currentPage]);

    // Fetch ad data if not provided by server
    useEffect(() => {
        if (cell.resolvedContent) {
            setAd(cell.resolvedContent);
            setLoading(false);
            return;
        }

        const fetchAd = async () => {
            if (!cell.contentId) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/ads/${cell.contentId}`);
                setAd(response.data.data || response.data);
            } catch (err) {
                console.error('Error fetching ad widget data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [cell.contentId, cell.resolvedContent, API_BASE_URL]);

    // Fire impression tracking
    useEffect(() => {
        if (ad && ad.id && shouldShowAd) {
            axios.post(`${API_BASE_URL}/ads/${ad.id}/impression`).catch(() => { });
        }
    }, [ad, API_BASE_URL, shouldShowAd]);

    if (loading && !ad) {
        return <div className="text-center p-3 animate-pulse bg-light rounded" style={{ height: '100px' }}></div>;
    }

    if (!ad || !shouldShowAd) return null;

    const adImage = ad.image;
    const adTitle = ad.title || ad.name || cell.contentTitle || 'Advertisement';
    const adLink = ad.imageUrl || ad.link || ad.url || '#';
    const imgSrc = adImage
        ? (adImage.startsWith('http') ? adImage : `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/uploads/ads/${adImage}`)
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
        <div className="ad-widget h-100 overflow-hidden" style={{ backgroundColor: '#ffffffff' }}>
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

    if (adLink && adLink !== '#') {
        return (
            <a
                href={adLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                onClick={() => {
                    if (ad && ad.id) {
                        axios.post(`${API_BASE_URL}/ads/${ad.id}/click`).catch(() => { });
                    }
                }}
            >
                {content}
            </a>
        );
    }

    return content;
};

export default AdWidget;
