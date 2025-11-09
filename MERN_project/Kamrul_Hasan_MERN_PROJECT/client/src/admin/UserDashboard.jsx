import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../store/auth";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`;
const REGISTER_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`;

const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        totalUsers: 0,
        adminUsers: 0,
        regularUsers: 0
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newPassword, setNewPassword] = useState(''); // NEW STATE
    const [confirmPassword, setConfirmPassword] = useState(''); // NEW STATE
    const [passwordError, setPasswordError] = useState(''); // NEW STATE
    const { token } = useAuth();

    // Form state for editing user
    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
        phone: '',
        isAdmin: false
    });

    // NEW: Form state for creating user
    const [createForm, setCreateForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    });

    // Get token from localStorage
    const getToken = () => {
        return localStorage.getItem('token');
    };

    // Fetch all users
    const fetchUsers = async () => {
        try {
            setLoading(true);

            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Debug: Log the response to see the actual structure
            console.log('Users API Response:', response);

            // Handle different possible response structures
            if (response.data && Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response.data && Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else if (response.data && response.data.users) {
                setUsers(response.data.users);
            } else {
                console.warn('Unexpected API response structure:', response.data);
                setUsers([]); // Set empty array as fallback
            }

        } catch (error) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', error);
            setUsers([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    // Fetch user statistics
    const fetchUserStats = async () => {
        try {

            const response = await axios.get(`${API_URL}/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Stats API Response:', response);

            // Handle different possible response structures for stats
            if (response.data && response.data.data) {
                setStats(response.data.data);
            } else if (response.data) {
                setStats(response.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    // NEW: Create user function
    const handleCreateUser = async (e) => {
        e.preventDefault();

        // Validation
        if (createForm.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (createForm.password !== createForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {

            const userData = {
                username: createForm.username,
                email: createForm.email,
                phone: createForm.phone,
                password: createForm.password,
                isAdmin: createForm.isAdmin
            };

            const response = await axios.post(REGISTER_BASE_URL, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                setShowCreateUserModal(false);
                setCreateForm({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    isAdmin: false
                });
                fetchUsers();
                fetchUserStats();
                alert('User created successfully!');
            }

        } catch (error) {
            setError(error.response?.data?.msg || 'Failed to create user');
            console.error('Error creating user:', error);
        }
    };

    // Delete user
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {

                await axios.delete(`${API_URL}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchUsers(); // Refresh the list
                fetchUserStats(); // Refresh stats
            } catch (error) {
                setError('Failed to delete user');
                console.error('Error deleting user:', error);
            }
        }
    };

    // Edit user
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditForm({
            username: user.username,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        });
        setShowEditModal(true);
    };

    // NEW: Reset password handler
    const handleResetPassword = (user) => {
        setSelectedUser(user);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setShowResetPasswordModal(true);
    };

    // NEW: Reset password submit

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.patch(
                `${API_URL}/${selectedUser._id}/reset-password`,
                { newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // ✅ Now response is properly defined
            if (response.data.success) {
                setShowResetPasswordModal(false);
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError('');
                alert('Password reset successfully!');
            }

        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Failed to reset password');
            console.error('Error resetting password:', error);
        }
    };


    // Update user
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {

            await axios.put(`${API_URL}/${selectedUser._id}`, editForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setShowEditModal(false);
            fetchUsers(); // Refresh the list
            fetchUserStats(); // Refresh stats
        } catch (error) {
            setError('Failed to update user');
            console.error('Error updating user:', error);
        }
    };

    // Filter users based on search - SAFE version
    const filteredUsers = Array.isArray(users)
        ? users.filter(user =>
            user && user.username && user.email && // Check if user and properties exist
            (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : [];

    useEffect(() => {
        fetchUsers();
        fetchUserStats();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4 custom-font-initial">
            {/* Header */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="h3 mb-0 text-gray-800">User Management Dashboard</h1>
                    <p className="text-muted">Manage all users in the system</p>
                </div>
                <div className="col-auto">
                    {/* NEW: Create User Button */}
                    <button
                        className="btn btn-success"
                        onClick={() => setShowCreateUserModal(true)}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Create New User
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Users
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {stats.totalUsers || 0}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Admin Users
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {stats.adminUsers || 0}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user-shield fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Regular Users
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {stats.regularUsers || 0}
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-secondary" type="button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="col-md-6 text-end">
                    <button className="btn btn-primary" onClick={fetchUsers}>
                        <i className="fas fa-sync-alt me-2"></i>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
            )}

            {/* Users Table */}
            <div className="card shadow">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Users List</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            <i className="fas fa-users fa-2x text-muted mb-2"></i>
                                            <p className="text-muted">
                                                {Array.isArray(users) && users.length === 0
                                                    ? 'No users found in system'
                                                    : 'No users match your search'
                                                }
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, index) => (
                                        <tr key={user._id || index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center">
                                                        <span className="text-white fw-bold">
                                                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                                        </span>
                                                    </div>
                                                    {user.username || 'N/A'}
                                                </div>
                                            </td>
                                            <td>{user.email || 'N/A'}</td>
                                            <td>{user.phone || 'N/A'}</td>
                                            <td>
                                                <span className={`badge ${user.isAdmin ? 'bg-danger' : 'bg-success'}`}>
                                                    {user.isAdmin ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => handleEditUser(user)}
                                                    >
                                                        <i className="fas fa-edit"></i> Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => handleResetPassword(user)}
                                                    >
                                                        <i className="fas fa-key"></i> Reset Password
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleDeleteUser(user._id)}
                                                    >
                                                        <i className="fas fa-trash"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleUpdateUser}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={editForm.username}
                                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isAdmin"
                                            checked={editForm.isAdmin}
                                            onChange={(e) => setEditForm({ ...editForm, isAdmin: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="isAdmin">
                                            Administrator
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* NEW: Reset Password Modal */}
            {showResetPasswordModal && selectedUser && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reset Password for {selectedUser.username}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowResetPasswordModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleResetPasswordSubmit}>
                                <div className="modal-body">
                                    <div className="alert alert-info">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Set a new password for this user. The user will need to use this new password to login.
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password (min 6 characters)"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            required
                                        />
                                    </div>

                                    {passwordError && (
                                        <div className="alert alert-danger">
                                            {passwordError}
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowResetPasswordModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-warning">
                                        <i className="fas fa-key me-2"></i>
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* NEW: Create User Modal */}
            {showCreateUserModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowCreateUserModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleCreateUser}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="createUsername" className="form-label">Username *</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="createUsername"
                                                    value={createForm.username}
                                                    onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="createEmail" className="form-label">Email *</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="createEmail"
                                                    value={createForm.email}
                                                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="createPhone" className="form-label">Phone *</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="createPhone"
                                                    value={createForm.phone}
                                                    onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="createPassword" className="form-label">Password *</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="createPassword"
                                                    value={createForm.password}
                                                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                                                    placeholder="Minimum 6 characters"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="createConfirmPassword" className="form-label">Confirm Password *</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="createConfirmPassword"
                                                    value={createForm.confirmPassword}
                                                    onChange={(e) => setCreateForm({ ...createForm, confirmPassword: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="createIsAdmin"
                                            checked={createForm.isAdmin}
                                            onChange={(e) => setCreateForm({ ...createForm, isAdmin: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="createIsAdmin">
                                            Administrator Role
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowCreateUserModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        <i className="fas fa-user-plus me-2"></i>
                                        Create User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;