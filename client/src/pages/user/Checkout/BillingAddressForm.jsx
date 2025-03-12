import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const BillingAddressForm = () => {
    const [formData, setFormData] = useState({
        billingFirstName: '',
        billingLastName: '',
        billingAddress: '',
        billingApartment: '',
        billingCity: '',
        billingState: '',
        billingPinCode: '',
        billingPhone: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    };

    const validateField = (name, value) => {
        if (!value.trim()) {
            return `${getFieldLabel(name)} is required`;
        }
    
        // Name, City, State: Only letters allowed, Min: 3, Max: 50
        if (["billingFirstName", "billingLastName", "billingCity", "billingState"].includes(name)) {
            if (!/^[A-Za-z\s]+$/.test(value)) {
                return `${getFieldLabel(name)} should contain only letters`;
            }
            if (value.length < 3 || value.length > 50) {
                return `${getFieldLabel(name)} must be between 3 and 50 characters`;
            }
        }
    
        // Street Address: Min 5, Max 100 characters
        if (name === "billingAddress" && (value.length < 5 || value.length > 100)) {
            return "Street Address must be between 5 and 100 characters";
        }
    
        // Pin Code: Exactly 6 digits
        if (name === "billingPinCode" && !/^\d{6}$/.test(value)) {
            return "Pin Code must be exactly 6 digits";
        }
    
        // Phone: Exactly 10 digits
        if (name === "billingPhone" && !/^\d{10}$/.test(value)) {
            return "Phone number must be exactly 10 digits";
        }
    
        return null; // No errors
    };
    
    const getFieldLabel = (fieldName) => {
        const fieldLabels = {
            billingFirstName: "First Name",
            billingLastName: "Last Name",
            billingCity: "City",
            billingState: "State",
            billingAddress: "Street Address",
            billingPinCode: "Pin Code",
            billingPhone: "Phone Number",
        };
        return fieldLabels[fieldName] || "This field";
    };
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        toast.success('Billing details saved successfully!');
    };

    return (
        <>
        <div>
            <form id="billingForm" className="billing-details form" style={{ display: 'block' }} onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h2 className="mt-2">Billing Details</h2>
                    <div className="row gx-2 gy-3">
                        {['billingFirstName', 'billingLastName', 'billingCity', 'billingState', 'billingPinCode', 'billingPhone'].map((field, index) => (
                            <div className="col-12 col-sm-6" key={index}>
                                <label className="form-label d-block">{getFieldLabel(field)}<span className="required">*</span></label>
                                <input name={field} type="text" className="w-100" placeholder={getFieldLabel(field)} value={formData[field]} onChange={handleChange} />
                                {errors[field] && <p className="error">{errors[field]}</p>}
                            </div>
                        ))}
                        <div className="col-12 col-sm-12">
                            <label className="form-label d-block">Street Address<span className="required">*</span></label>
                            <textarea name="billingAddress" className="w-100" rows="2" placeholder="Street Address" value={formData.billingAddress} onChange={handleChange}></textarea>
                            {errors.billingAddress && <p className="error">{errors.billingAddress}</p>}
                        </div>
                        <div className="col-12 col-sm-12">
                            <label className="form-label d-block">Apartment, Floor, etc. (Optional)</label>
                            <textarea name="billingApartment" className="w-100" rows="2" placeholder="Apartment, Floor, etc." value={formData.billingApartment} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <input type="submit" value="Save Address" className="btn btn-success mt-2"  />
                </div>
            </form>
        </div>
        </>
    );
};

export default BillingAddressForm;
