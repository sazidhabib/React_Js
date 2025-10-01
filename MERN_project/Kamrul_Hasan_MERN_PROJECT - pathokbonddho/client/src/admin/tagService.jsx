// services/tagService.js
const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/tags`;

// This will be set by the component using the service
let getAuthToken = () => null;

export const setAuthTokenGetter = (getter) => {
    getAuthToken = getter;
};

const getHeaders = (isFormData = false) => {
    const headers = {};
    const token = getAuthToken();

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const getTags = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE}?${queryString}`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
};

export const getTag = async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch tag');
    return response.json();
};

export const createTag = async (tagData) => {
    const formData = new FormData();

    // Append all fields to formData
    Object.keys(tagData).forEach(key => {
        if (tagData[key] !== null && tagData[key] !== undefined) {
            formData.append(key, tagData[key]);
        }
    });

    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(true),
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Create tag error response:', errorText);
        throw new Error(`Failed to create tag: ${response.status}`);
    }
    return response.json();
};

export const updateTag = async (id, tagData) => {
    const formData = new FormData();

    Object.keys(tagData).forEach(key => {
        if (tagData[key] !== null && tagData[key] !== undefined) {
            formData.append(key, tagData[key]);
        }
    });

    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Update tag error response:', errorText);
        throw new Error('Failed to update tag');
    }
    return response.json();
};

export const deleteTag = async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Failed to delete tag');
    return response.json();
};

export const bulkDeleteTags = async (tagIds) => {
    const response = await fetch(`${API_BASE}/bulk-delete`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ tagIds }),
    });

    if (!response.ok) throw new Error('Failed to delete tags');
    return response.json();
};