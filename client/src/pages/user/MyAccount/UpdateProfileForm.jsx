import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const UpdateProfileForm = () => {
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        userImage: null,
    });
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState('/img/users/default-img.png');

    // Fetch user data
    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/users/${id}`);
            const { firstName, lastName, phone, userImage } = res.data;
            setFormData({ firstName, lastName, phone, userImage: null });
            if (userImage) setPreviewImage(userImage);
        } catch (err) {
            toast.error("Failed to load user data");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateField('userImage', file);
            setErrors(prev => ({ ...prev, userImage: error }));

            if (!error) {
                setFormData(prev => ({ ...prev, userImage: file }));
                setPreviewImage(URL.createObjectURL(file));
            }
        }
    };

    const validateField = (name, value) => {
        let error = null;
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const maxSize = 1 * 1024 * 1024;

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) error = `${name === 'firstName' ? "First" : "Last"} name is required`;
                else if (!nameRegex.test(value)) error = "Only letters are allowed";
                else if (value.length < 2 || value.length > 30) error = "Must be between 2 and 30 characters";
                break;
            case 'phone':
                if (!value.trim()) error = "Phone number is required";
                else if (!phoneRegex.test(value)) error = "Phone number must be exactly 10 digits";
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) formErrors[field] = error;
        });

        if (Object.values(formErrors).some(err => err)) {
            setErrors(formErrors);
            return;
        }

        const submitData = new FormData();
        submitData.append('firstName', formData.firstName);
        submitData.append('lastName', formData.lastName);
        submitData.append('phone', formData.phone);
        if (formData.userImage) {
            submitData.append('userImage', formData.userImage);
        }

        try {
            await axios.put(`http://localhost:8000/api/users/${id}`, submitData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div>
            <form className="edit-profile form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-2">
                    <div className="col-12 col-sm-6 mb-1">
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

                    <div className="col-12 col-sm-6 mb-1">
                        <label className="form-label">Phone</label>
                        <input
                            type="number"
                            className="w-100"
                            name="phone"
                            placeholder="Your Phone*"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
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

                    <div className="col-md-6 text-center">
                        <img src={previewImage} alt="Profile" height="100" />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <input type="submit" value="Update Profile" className="btn-msg mt-3" />
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default UpdateProfileForm;
