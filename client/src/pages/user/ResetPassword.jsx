import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
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
        if (!value.trim()) {
            error = name === "newPassword" ? "New password is required" : "Confirm password is required";
        } else if (name === "newPassword" && value.length < 6) {
            error = "Password must be at least 6 characters long";
        } else if (name === "confirmPassword" && value !== formData.newPassword) {
            error = "Passwords do not match";
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
        toast.success("Password reset successful!");
    };

    return (
        <div className="container">
            <div className="row p-3 g-3 justify-content-center">
                <div className="col-md-6">
                    <div className="login-form d-flex flex-column justify-content-center h-100 align-items-center mt-4">
                        <div className="mb-3 w-75">
                            <h2 className="mb-3">Reset Password</h2>
                            <div className="mb-4">Enter your new password</div>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="password" 
                                    name="newPassword" 
                                    className="w-100 " 
                                    placeholder="New Password" 
                                    value={formData.newPassword} 
                                    onChange={handleChange} 
                                />
                                <p className="error mb-3">{errors.newPassword}</p>

                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    className="w-100" 
                                    placeholder="Confirm New Password" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                />
                                <p className="error  mb-3">{errors.confirmPassword}</p>

                                <input type="submit" value="Reset Password" className="btn-msg w-100" />
                                <div className="mt-4 text-center">
                                    <Link to="/login" className="dim link ms-2">Back to log in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
