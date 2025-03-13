import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

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
        toast.success('OTP sent to your email!', { position: "top-right" });
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
                                    className="w-100 mb-2" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error && <p className="error">{error}</p>}
                                <input type="submit" value="Send OTP" className="btn-msg w-100" />
                                <div className="mt-4 text-center">
                                    <a href="login.php" className="dim link ms-2">Back to log in</a>
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