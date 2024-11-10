import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiEdit2 } from 'react-icons/fi';

export default function UpdateProfile() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isPasswordChange, setIsPasswordChange] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
                mobile: user.phNo || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const validateForm = () => {
        if (isPasswordChange) {
            if (!formData.currentPassword) {
                setError('Current password is required');
                return false;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                setError('New passwords do not match');
                return false;
            }
            if (formData.newPassword && formData.newPassword.length < 6) {
                setError('Password must be at least 6 characters');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    userId: user._id,
                    username: formData.username,
                    email: formData.email,
                    phNo: formData.mobile,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();
            if (data.success) {
                setSuccess('Profile updated successfully');
                setIsPasswordChange(false);
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (err) {
            setError('An error occurred while updating profile');
        }
    };

    const handleDiscard = () => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                mobile: user.phNo || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setIsPasswordChange(false);
            setError('');
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-medium text-white mb-8">My Profile Page</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-500 text-white rounded-md">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username and Email */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white mb-2">Username *</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-white text-black rounded-md px-4 py-2.5"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-white mb-2">Email Id *</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white text-black rounded-md px-4 py-2.5"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-white mb-2">Mobile Number *</label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full bg-white text-black rounded-md px-4 py-2.5 pl-16"
                                placeholder="Enter mobile number"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center px-3 border-r border-gray-300">
                                <span className="text-gray-500">+91</span>
                            </div>
                        </div>
                    </div>

                    {/* Password Change Toggle */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="changePassword"
                            checked={isPasswordChange}
                            onChange={() => setIsPasswordChange(!isPasswordChange)}
                            className="form-checkbox text-emerald-500"
                        />
                        <label htmlFor="changePassword" className="text-white">
                            Change Password
                        </label>
                    </div>

                    {/* Password Fields */}
                    {isPasswordChange && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">Current Password *</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white text-black rounded-md px-4 py-2.5"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">New Password *</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white text-black rounded-md px-4 py-2.5"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Confirm New Password *</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white text-black rounded-md px-4 py-2.5"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={handleDiscard}
                            className="px-6 py-2.5 bg-transparent text-white border border-gray-700 rounded-md hover:bg-gray-800"
                        >
                            DISCARD CHANGES
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                        >
                            SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}