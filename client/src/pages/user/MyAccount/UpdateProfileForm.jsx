import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProfileForm = () => {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        phone: '9876543210',
        userImage: null
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));

        // Validate and clear errors when corrected
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateField('userImage', file);
            setErrors(prevErrors => ({ ...prevErrors, userImage: error }));

            if (!error) {
                setFormData(prevData => ({ ...prevData, userImage: file }));
            }
        }
    };

    const validateField = (name, value) => {
        let error = null;
        const nameRegex = /^[A-Za-z\s]+$/; // Only letters & spaces
        const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
        const maxSize = 1 * 1024 * 1024; // 5MB

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) 
                    error = `${name === 'firstName' ? "First" : "Last"} name is required`;
                else if (!nameRegex.test(value))
                    error = "Only letters are allowed";
                else if (value.length < 2 || value.length > 30)
                    error = "Must be between 2 and 30 characters";
                break;

            case 'phone':
                if (!value.trim()) 
                    error = "Phone number is required";
                else if (!phoneRegex.test(value))
                    error = "Phone number must be exactly 10 digits";
                break;

            case 'userImage':
                if (value) {
                    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(value.type))
                        error = "Only JPG, JPEG, and PNG files are allowed";
                    else if (value.size > maxSize)
                        error = "File size must be less than 1MB";
                }
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
        toast.success('Profile updated successfully!', { position: "top-right" });
    };

    return (
        <div>
            <form className="edit-profile form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-2">
                    <div className="col-12 col-sm-6">
                        <label className="form-label">First Name</label>
                        <input 
                            type="text" 
                            className="w-100" 
                            name="firstName" 
                            placeholder="Your Name*" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>

                    <div className="col-12 col-sm-6">
                        <label className="form-label">Last Name</label>
                        <input 
                            type="text" 
                            className="w-100" 
                            name="lastName" 
                            placeholder="Your Last name*" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>

                    <div className="col-12 col-sm-6">
                        <label className="form-label">Email</label>
                        <input type="text" className="w-100" placeholder="Your Email*" defaultValue="john.doe@example.com" disabled />
                    </div>

                    <div className="col-12 col-sm-6">
                        <label className="form-label">Phone</label>
                        <input 
                            type="text" 
                            className="w-100" 
                            name="phone" 
                            placeholder="Your Phone*" 
                            value={formData.phone} 
                            onChange={handleChange} 
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    <div className="col-12 col-sm-6">
                        <img src="img/users/default.jpg" alt="Profile Picture" height="200" width="200" />
                        <input type="hidden" name="old_image" defaultValue="default.jpg" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">User Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            name="userImage" 
                            accept="image/*" 
                            onChange={handleFileChange}
                        />
                        {errors.userImage && <p className="error">{errors.userImage}</p>}
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <input type="submit" value="Update Profile" className="btn-msg mt-2 " />
                </div>
            </form>
        </div>
    );
};

export default UpdateProfileForm;
