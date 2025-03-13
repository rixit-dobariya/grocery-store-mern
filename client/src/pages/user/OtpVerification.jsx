import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const [errors, setErrors] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);

    // Countdown Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            setResendEnabled(true);
            return;
        }
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [timeLeft]);

    // OTP Validation
    const validateOtp = (value) => {
        if (!value.trim()) return "OTP is required.";
        if (value.length !== 6 || isNaN(value)) return "Enter a valid 6-digit OTP.";
        return null;
    };

    // Handle OTP Input Change
    const handleOtpChange = (e) => {
        const value = e.target.value;
        setOtp(value);
        setErrors({ otp: validateOtp(value) });
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validateOtp(otp);
        if (error) {
            setErrors({ otp: error });
            return;
        }
        toast.success("OTP verified successfully!");
    };

    // Handle Resend OTP
    const handleResendOtp = () => {
        setTimeLeft(60);
        setResendEnabled(false);
        toast.info("OTP resent successfully!");
    };

    return (
        <div className="container">
            <div className="row p-3 g-3 justify-content-center">
                <div className="col-md-6">
                    <div className="login-form d-flex flex-column justify-content-center h-100 align-items-center mt-4">
                        <div className="mb-3 w-75">
                            <h2 className="mb-3">Enter OTP</h2>
                            <div className="mb-4">Enter the OTP we sent to your email</div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="otp"
                                    className="w-100"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={handleOtpChange}
                                />
                                <p className="error mb-4">{errors.otp}</p>
                                <input type="submit" value="Verify" className="btn-msg w-100" />
                            </form>
                            <div className="mt-4 text-center">
                                {timeLeft > 0 ? (
                                    <div className="text-danger">Resend OTP in {timeLeft} seconds</div>
                                ) : (
                                    <button onClick={handleResendOtp} className="otp ms-2">
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
