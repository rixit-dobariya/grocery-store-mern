import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const product = {
        id: 1,
        name: "1 KG Fresh Apple",
        image: "66ee9001ceeaeapple.webp",
        description: "Fresh and juicy apples sourced from organic farms. Perfect for a healthy diet.",
        salePrice: 500,
        discount: 10, // 10% discount
        rating: 4.5,
        reviewCount: 8,
    };
    
    const reviews = [
        {
            id: 1,
            user: "John Doe",
            rating: 5,
            review: "Excellent quality apples! They were fresh and sweet. Will buy again.",
            date: "March 10, 2025",
            reply: "Thank you for your feedback, John! We’re glad you liked them.",
            replier: "Seller",
            replyDate: "March 10, 2025",
        },
        {
            id: 2,
            user: "Jane Doe",
            rating: 4,
            review: "Good quality but a little expensive.",
            date: "March 11, 2025",
            reply: "We appreciate your review, Jane! We ensure premium quality, and pricing reflects that.",
            replier: "Seller",
            replyDate: "March 11, 2025",
        },
        {
            id: 3,
            user: "Michael Smith",
            rating: 5,
            review: "Best apples I've had in a while. Crisp and delicious!",
            date: "March 12, 2025",
            reply: "Thank you, Michael! Hope to serve you again soon!",
            replier: "Seller",
            replyDate: "March 12, 2025",
        },
        {
            id: 4,
            user: "Emily Johnson",
            rating: 3,
            review: "Decent quality, but some apples were a bit bruised.",
            date: "March 13, 2025",
            reply: "Sorry for the inconvenience, Emily. We will improve our packaging.",
            replier: "Seller",
            replyDate: "March 13, 2025",
        },
        {
            id: 5,
            user: "David Brown",
            rating: 4,
            review: "Very tasty and fresh. Delivery was also quick!",
            date: "March 14, 2025",
            reply: "Thank you for your kind words, David!",
            replier: "Seller",
            replyDate: "March 14, 2025",
        },
    ];
    
    
    const finalPrice = (450).toFixed(2);
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [review, setReview] = useState({ rating: "", review: "" });
    const [errors, setErrors] = useState({});
    
    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
        setErrors(prevErrors => ({ ...prevErrors, quantity: "" })); // Clear only quantity error
    };
    
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    
        // Validate and update errors for the changed field
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };
    
    const validateField = (name, value) => {
        let error = null;
        
        if (name === "rating") {
            if (!value) error = "Rating is required";
        } else if (name === "review") {
            if (!value.trim()) error = "Review cannot be empty";
        } else if (name === "quantity") {
            if (!value) error = "Please select a quantity";
        }
    
        return error;
    };
    
    const validateReview = () => {
        let errors = {};
    
        errors.rating = validateField("rating", review.rating);
        errors.review = validateField("review", review.review);
    
        // Remove null errors
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) delete errors[key];
        });
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const submitReview = (e) => {
        e.preventDefault();
        if (validateReview()) {
            toast.success("Review submitted successfully!");
            setReview({ rating: "", review: "" });
            setErrors({});
        }
    };
    
    const validateQuantity = () => {
        let errors = {};
        if(!selectedQuantity) errors.quantity = "Please select a quantity";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleCartSubmit = ()=>{
        if (validateQuantity()) {
            toast.success("Product added to cart successfully!");
            setSelectedQuantity(null);
            setErrors({});
        }
    }
    return (
        <div className="container sitemap mt-5">
            <p>
                <Link to="/" className="text-decoration-none dim link">Home /</Link>
                <Link to="/shop" className="text-decoration-none dim link">Shop /</Link>
            </p>

            <div className="row">
                <div className="col-md-5">
                    <img src={`/img/items/products/${product.image}`} alt="Product" className="img-thumbnail p-3 w-100" />
                </div>
                <div className="col-md-7 px-5 d-flex flex-column align-items-start">
                    <h4 className="product-title">{product.name}</h4>
                    <div className="rating-section-description">
                        <div className="ratings">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`fa fa-star ${product.rating > i ? "checked" : ""}`}></span>
                            ))} 
                        </div>
                        <div className="review-count ps-1">
                            ({product.reviewCount})
                        </div>
                    </div>
                    <p className="product-description mt-3">{product.description}</p>
                    <div className="row align-items-center mt-3 w-100">
                        <div className="col-3">Price</div>
                        <div className="col-9 price">₹{finalPrice}</div>
                    </div>
                    <div className="row align-items-center mt-3 w-100">
                        <div className="col-3">Quantity</div>
                        <div className="col-9 d-flex flex-wrap">
                            {[1, 2, 3, 4, 5].map(q => (
                                <div key={q}  onClick={() => handleQuantityChange(q)} className="quantity">
                                    <div  className={selectedQuantity === q ? "selected" : ""}>
                                        {q}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
                    </div>
                    <button onClick={handleCartSubmit} className="add-to-cart-btn primary-btn w-100 mt-4">Add to Cart</button>
                </div>
            </div>

            <div className="container my-5">
                <h4 className="mb-4 text-center fw-bold">Customer Reviews</h4>
                <div className="row">
                     <div className="col-6">
                        <form onSubmit={submitReview} className="mb-4">
                            <div className="mb-3">
                                <label className="d-block">Rating</label>
                                <select name="rating" className="form w-100 p-2 rounded" onChange={handleReviewChange} value={review.rating}>
                                    <option value="">Select rating</option>
                                    {[1, 2, 3, 4, 5].map(r => (
                                        <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                                {errors.rating && <p className="text-danger">{errors.rating}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="d-block">Review</label>
                                <textarea name="review" className="w-100" rows="3" placeholder="Please add your review" onChange={handleReviewChange} value={review.review}></textarea>
                                {errors.review && <p className="text-danger">{errors.review}</p>}
                            </div>
                            <button type="submit" className="primary-btn">Submit Review</button>
                        </form>
                    </div>    
                    <div className="col-6">
                        <div className="row align-items-stretch">
                            {reviews.map(r => (
                                <div key={r.id} className="col-md-6 mb-4">
                                    <div className="review-card  card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{r.user}</h5>
                                            <h6 className="card-subtitle mb-2 text-warning">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`fa fa-star ${r.rating > i ? "checked" : ""}`}></span>
                                            ))}
                                            </h6>
                                            <p className="card-text">{r.review}</p>
                                            <small className="text-muted mb-0">{r.date}</small>
                                        </div>
                                        {
                                            r.reply && 
                                            <div className="card-body ms-5 ">
                                                <h5 className="card-title">{r.replier}</h5>
                                                <p className="card-text">{r.reply}</p>
                                                <small className="text-muted mb-0">{r.replyDate}</small>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;