import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
	const [formData, setFormData] = useState({
		contactName: "",
		contactEmail: "",
		contactPhone: "",
		contactMessage: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		// Validate field and update errors
		const error = validateField(name, value);
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
	};

	const validateField = (name, value) => {
		let error = "";

		switch (name) {
			case "contactName":
				if (!value.trim()) error = "Name is required";
				break;
			case "contactEmail":
				if (!value.trim()) error = "Email is required";
				else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
					error = "Invalid email format";
				break;
			case "contactPhone":
				if (!value.trim()) error = "Phone number is required";
				else if (!/^\d{10}$/.test(value))
					error = "Phone number must be 10 digits";
				break;
			case "contactMessage":
				if (!value.trim()) error = "Message is required";
				else if (value.length < 10)
					error = "Message must be at least 10 characters";
				break;
			default:
				break;
		}
		return error;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate all fields
		const formErrors = {};
		Object.keys(formData).forEach((field) => {
			const error = validateField(field, formData[field]);
			if (error) formErrors[field] = error;
		});

		if (Object.values(formErrors).some((error) => error)) {
			setErrors(formErrors);
			return;
		}

		setErrors({});
		toast.success("Message sent successfully!");
		setFormData({
			contactName: "",
			contactEmail: "",
			contactPhone: "",
			contactMessage: "",
		});
	};

	return (
		<>
			<div className="container mt-4">
				<p>
					<a
						href="index.php"
						className="text-decoration-none dim link"
					>
						Home /
					</a>{" "}
					Contact
				</p>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-4 col-sm-12 p-2">
						<div className="shadow-sm p-4 flex-col">
							<div className="flex">
								<img
									src="img/icons/icons-phone.png"
									alt="Phone"
								/>
								<p className="m-0">Call to us</p>
							</div>
							<p className="m-0">
								We are available 24/7, 7 days a week.
							</p>
							<p className="m-0">Phone: +91 87329 65892</p>
							<div className="line"></div>
							<div className="flex">
								<img
									src="img/icons/icons-mail.png"
									alt="Mail"
								/>
								<p className="m-0">Write To Us</p>
							</div>
							<p className="m-0">
								Fill out our form and we will contact you within
								24 hours.
							</p>
							<p className="m-0 text-break">
								Email: purebitegroceryshop@gmail.com
							</p>
						</div>
					</div>
					<div className="col-12 col-md-8 col-sm-12 p-2">
						<div className="shadow-sm p-4">
							<form id="contactForm" onSubmit={handleSubmit}>
								<div className="flex form">
									<div className="flex-item">
										<input
											type="text"
											id="contactName"
											name="contactName"
											placeholder="Your Name*"
											className="w-100"
											value={formData.contactName}
											onChange={handleChange}
										/>
										{errors.contactName && (
											<p className="error">
												{errors.contactName}
											</p>
										)}
									</div>
									<div className="flex-item">
										<input
											type="text"
											id="contactEmail"
											name="contactEmail"
											placeholder="Your Email*"
											className="w-100"
											value={formData.contactEmail}
											onChange={handleChange}
										/>
										{errors.contactEmail && (
											<p className="error">
												{errors.contactEmail}
											</p>
										)}
									</div>
									<div className="flex-item">
										<input
											type="text"
											id="contactPhone"
											name="contactPhone"
											placeholder="Your Phone*"
											className="w-100"
											value={formData.contactPhone}
											onChange={handleChange}
										/>
										{errors.contactPhone && (
											<p className="error">
												{errors.contactPhone}
											</p>
										)}
									</div>
								</div>
								<div className="flex flex-column align-items-start">
									<textarea
										name="contactMessage"
										id="contactMessage"
										className="flex-item w-100"
										rows="7"
										placeholder="Your Message*"
										value={formData.contactMessage}
										onChange={handleChange}
									></textarea>
									{errors.contactMessage && (
										<p className="error">
											{errors.contactMessage}
										</p>
									)}
								</div>
								<div className="d-flex justify-content-end">
									<input
										type="submit"
										name="submit"
										value="Send Message"
										className="btn-msg mt-2"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;
