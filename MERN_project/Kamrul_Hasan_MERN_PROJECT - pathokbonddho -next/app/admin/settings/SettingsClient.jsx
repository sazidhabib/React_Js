'use client';

import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Tabs, Tab, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";

const SettingsClient = ({ isAdmin }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [existingId, setExistingId] = useState(null);

    const [settings, setSettings] = useState({
        siteName: 'Pathokbonddho',
        siteNameBn: 'পাঠকবন্ধু',
        tagline: '',
        logo: '/images/Logo.png',
        favicon: '/favicon.ico',
        contact: {
            email: 'info@pathokbonddho.com',
            phone: '+880 1XXX-XXXXXX',
            address: 'Dhaka, Bangladesh'
        },
        social: {
            facebook: 'https://facebook.com/pathokbonddho',
            twitter: 'https://twitter.com/pathokbonddho',
            instagram: 'https://instagram.com/pathokbonddho',
            linkedin: 'https://linkedin.com/company/pathokbonddho',
            youtube: 'https://youtube.com/pathokbonddho'
        },
        seo: {
            description: 'Latest news and updates from Pathokbonddho.',
            keywords: 'news, bangladesh, pathokbonddho'
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/designs', { params: { search: 'site-settings' } });
                const designs = res.data.designs || res.data || [];
                const siteSettings = designs.find(d => d.slug === 'site-settings');

                if (siteSettings) {
                    setExistingId(siteSettings.id);
                    const data = typeof siteSettings.design_data === 'string' 
                        ? JSON.parse(siteSettings.design_data) 
                        : siteSettings.design_data;
                    
                    // Merge with defaults to ensure all fields exist
                    setSettings(prev => ({
                        ...prev,
                        ...data,
                        contact: { ...prev.contact, ...(data.contact || {}) },
                        social: { ...prev.social, ...(data.social || {}) },
                        seo: { ...prev.seo, ...(data.seo || {}) }
                    }));
                }
            } catch (err) {
                console.error("Failed to load settings:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isAdmin) fetchSettings();
    }, [isAdmin]);

    const handleChange = (section, field, value) => {
        if (section) {
            setSettings(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setSettings(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            design_name: 'Site Settings',
            slug: 'site-settings',
            design_status: true,
            description: 'Core website configuration managed via Settings panel',
            design_data: settings
        };

        try {
            if (existingId) {
                await api.patch(`/designs/${existingId}`, payload);
            } else {
                await api.post('/designs', payload);
            }
            toast.success("Settings saved successfully!");
        } catch (err) {
            toast.error("Failed to save settings");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;
    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold"><i className="fas fa-cog me-2"></i>Website Settings</h2>
                <Button variant="primary" onClick={handleSave} disabled={saving} className="px-5 shadow-sm">
                    {saving ? <Spinner animation="border" size="sm" /> : 'Save All Changes'}
                </Button>
            </div>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-0">
                    <Tabs defaultActiveKey="general" id="settings-tabs" className="custom-tabs border-bottom">
                        {/* General Settings */}
                        <Tab eventKey="general" title="General" className="p-4">
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Site Name (English)</Form.Label>
                                        <Form.Control 
                                            value={settings.siteName} 
                                            onChange={e => handleChange(null, 'siteName', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Site Name (Bengali)</Form.Label>
                                        <Form.Control 
                                            value={settings.siteNameBn} 
                                            onChange={e => handleChange(null, 'siteNameBn', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Site Tagline</Form.Label>
                                        <Form.Control 
                                            value={settings.tagline} 
                                            onChange={e => handleChange(null, 'tagline', e.target.value)}
                                            placeholder="Catchy headline for the site"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Logo Path / URL</Form.Label>
                                        <Form.Control 
                                            value={settings.logo} 
                                            onChange={e => handleChange(null, 'logo', e.target.value)}
                                        />
                                        <small className="text-muted">Standard: /images/Logo.png</small>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Favicon Path / URL</Form.Label>
                                        <Form.Control 
                                            value={settings.favicon} 
                                            onChange={e => handleChange(null, 'favicon', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>

                        {/* Social Links */}
                        <Tab eventKey="social" title="Social Links" className="p-4">
                            <Row className="g-4">
                                {Object.keys(settings.social).map(key => (
                                    <Col md={6} key={key}>
                                        <Form.Group className="mb-3 text-capitalize">
                                            <Form.Label className="fw-bold"><i className={`fab fa-${key === 'twitter' ? 'x-twitter' : key} me-2`}></i>{key}</Form.Label>
                                            <Form.Control 
                                                value={settings.social[key]} 
                                                onChange={e => handleChange('social', key, e.target.value)}
                                                placeholder={`https://${key}.com/yourpage`}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </Tab>

                        {/* Contact Info */}
                        <Tab eventKey="contact" title="Contact Us" className="p-4">
                            <Row className="g-4">
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Email Address</Form.Label>
                                        <Form.Control 
                                            value={settings.contact.email} 
                                            onChange={e => handleChange('contact', 'email', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Phone Number</Form.Label>
                                        <Form.Control 
                                            value={settings.contact.phone} 
                                            onChange={e => handleChange('contact', 'phone', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Office Address</Form.Label>
                                        <Form.Control 
                                            as="textarea"
                                            rows={3}
                                            value={settings.contact.address} 
                                            onChange={e => handleChange('contact', 'address', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>

                        {/* SEO Settings */}
                        <Tab eventKey="seo" title="SEO & Keywords" className="p-4">
                            <Row className="g-4">
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Global Meta Description</Form.Label>
                                        <Form.Control 
                                            as="textarea"
                                            rows={3}
                                            value={settings.seo.description} 
                                            onChange={e => handleChange('seo', 'description', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Keywords (comma separated)</Form.Label>
                                        <Form.Control 
                                            as="textarea"
                                            rows={2}
                                            value={settings.seo.keywords} 
                                            onChange={e => handleChange('seo', 'keywords', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SettingsClient;
