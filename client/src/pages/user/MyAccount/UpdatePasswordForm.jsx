import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const UpdatePasswordForm = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate and clear errors when corrected
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
    
    const handleSubmit = (e) => {
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
        toast.success('Form submitted successfully!', { position: "top-right" });
    };

    return (
        <div>
            <form className="edit-profile form" onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-12">
                        <label className="form-label d-block">Password</label>
                        <input 
                            type="password" 
                            name="currentPassword" 
                            className="w-100 mb-2" 
                            placeholder="Current password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                        {errors.currentPassword && <p className="error">{errors.currentPassword}</p>}

                        <input 
                            type="password" 
                            name="newPassword" 
                            className="w-100 mb-2" 
                            placeholder="New password" 
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        {errors.newPassword && <p className="error">{errors.newPassword}</p>}

                        <input 
                            type="password" 
                            name="confirmPassword" 
                            className="w-100 mb-2" 
                            placeholder="Confirm password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <input type="submit" name="change" value="Change Password" className="btn-msg mt-2" />
                </div>
            </form>
        </div>
    );
};

export default UpdatePasswordForm;
