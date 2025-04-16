import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdatePasswordForm = ({email}) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const validateField = (name, value) => {
        let error = null;
        const maxLength = 20;

        switch (name) {
            case 'currentPassword':
                if (!value.trim())
                    error = "Current password is required";
                else if (value.length < 6)
                    error = "Password must be at least 6 characters long";
                else if (value.length > maxLength)
                    error = `Password must not exceed ${maxLength} characters`;
                break;

            case 'newPassword':
                if (!value.trim())
                    error = "New password is required";
                else if (value.length < 6)
                    error = "Password must be at least 6 characters long";
                else if (value.length > maxLength)
                    error = `Password must not exceed ${maxLength} characters`;
                else if (value === formData.currentPassword)
                    error = "New password cannot be the same as the current password";
                break;

            case 'confirmPassword':
                if (!value.trim())
                    error = "Confirm password is required";
                else if (value.length > maxLength)
                    error = `Password must not exceed ${maxLength} characters`;
                else if (value !== formData.newPassword)
                    error = "Passwords do not match";
                break;

            default:
                break;
        }

        return error;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.values(formErrors).some(error => error)) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await axios.put("http://localhost:8000/users/update-password", {
                email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            if (response.data.message === "Password updated successfully") {
                toast.success("Password updated successfully!");
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error(response.data.message || "Failed to update password.");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="edit-profile form" onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-12">
                        <label className="form-label d-block">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            className="w-100"
                            placeholder="Current password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                        <p className="error mb-2">{errors.currentPassword}</p>

                        <label className="form-label d-block mt-1">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="w-100 "
                            placeholder="New password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <p className="error mb-2">{errors.newPassword}</p>

                        <label className="form-label d-block mt-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-100"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <p className="error mb-2">{errors.confirmPassword}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <input
                        type="submit"
                        name="change"
                        value={loading ? "Loading..." : "Change Password"}
                        className="btn-msg mt-2"
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdatePasswordForm;
