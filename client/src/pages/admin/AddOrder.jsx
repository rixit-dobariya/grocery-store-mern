import { useState } from "react";
import { toast } from "react-toastify";

const AddOrder = () => {
    const staticProducts = [
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Carrot" },
        { id: 4, name: "Dates" },
    ];

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        billingAddress: "",
        shippingAddress: "",
        products: [{ productId: "", quantity: "" }],
        sameAsBilling: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e, index = null) => {
        const { name, value, type, checked } = e.target;

        if (name === "sameAsBilling") {
            setFormData((prev) => ({
                ...prev,
                sameAsBilling: checked,
                shippingAddress: checked ? prev.billingAddress : "",
            }));
            return;
        }

        if (index !== null) {
            const updatedProducts = [...formData.products];
            updatedProducts[index][name] = value;
            setFormData({ ...formData, products: updatedProducts });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateField = (name, value) => {
        let error = "";

        if (!value.trim()) {
            error = `${name.replace(/([A-Z])/g, ' $1')} is required.`;
        } else {
            if (name === "phone" && !/^\d{10}$/.test(value)) {
                error = "Phone number must be 10 digits.";
            }
            if (name === "quantity" && (!/^[1-9]\d*$/.test(value) || parseInt(value, 10) <= 0)) {
                error = "Quantity must be a positive number.";
            }
        }
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {};
        Object.keys(formData).forEach((field) => {
            if (field !== "products" && field !== "sameAsBilling") {
                const error = validateField(field, formData[field]);
                if (error) formErrors[field] = error;
            }
        });

        formData.products.forEach((product, index) => {
            if (!product.productId) {
                formErrors[`product-${index}`] = "Product selection is required.";
            }
            const error = validateField("quantity", product.quantity);
            if (error) formErrors[`quantity-${index}`] = error;
        });

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors({});
        toast.success("Order added successfully!");
    };

    const addProductField = () => {
        setFormData({ ...formData, products: [...formData.products, { productId: "", quantity: "" }] });
    };

    return (
        <div>
            <h1 className="mt-4">Add Order</h1>
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Customer Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                            />
                            {errors.customerName && <p className="text-danger">{errors.customerName}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="text-danger">{errors.phone}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Billing Address</label>
                            <textarea
                                className="form-control"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                            ></textarea>
                            {errors.billingAddress && <p className="text-danger">{errors.billingAddress}</p>}
                        </div>
                        <div className="mb-3">
                            <input
                                type="checkbox"
                                name="sameAsBilling"
                                checked={formData.sameAsBilling}
                                onChange={handleChange}
                            /> Same as Billing Address
                        </div>
                        {!formData.sameAsBilling && (
                            <div className="mb-3">
                                <label className="form-label">Shipping Address</label>
                                <textarea
                                    className="form-control"
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.shippingAddress && <p className="text-danger">{errors.shippingAddress}</p>}
                            </div>
                        )}
                        {formData.products.map((product, index) => (
                            <div key={index} className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Product</label>
                                    <select
                                        className="form-control"
                                        name="productId"
                                        value={product.productId}
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="">Select Product</option>
                                        {staticProducts.map((p) => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                    {errors[`product-${index}`] && <p className="text-danger">{errors[`product-${index}`]}</p>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                    {errors[`quantity-${index}`] && <p className="text-danger">{errors[`quantity-${index}`]}</p>}
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary mb-3" onClick={addProductField}>
                            Add Product
                        </button>
                        <button type="submit" className="btn btn-primary">Add Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;
