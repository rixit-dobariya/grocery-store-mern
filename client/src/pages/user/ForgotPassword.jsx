import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    
        if (!newEmail.trim()) {
            setError('Email is required');
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setError('Enter a valid email address');
            return;
        }
        setError('');
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setError('Email is required');
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Enter a valid email address');
            return;
        }
        
        setError('');
        navigate("/verify-otp");
    };

    return (
        <div className="container">
            <div className="row p-3 g-3 justify-content-center">
                <div className="col-md-6">
                    <div className="login-form d-flex flex-column justify-content-center h-100 align-items-center mt-4">
                        <div className="mb-3 w-75">
                            <h2 className="mb-3">Forgot Password?</h2>
                            <div className="mb-4">Enter an email account to reset password</div>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text" 
                                    id="otpEmail" 
                                    name="email" 
                                    className="w-100" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={handleChange}
                                />
                                <p className="error">{error}</p>
                                <input type="submit" value="Send OTP" className="btn-msg w-100 mt-2" />
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

export default ForgotPassword;