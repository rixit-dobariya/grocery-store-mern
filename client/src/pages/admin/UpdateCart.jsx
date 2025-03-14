import { useState } from "react";
import { toast } from "react-toastify";

const UpdateCart = () => {
  const [user, setUser] = useState("1");
  const [product, setProduct] = useState("101");
  const [quantity, setQuantity] = useState(2);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!user) formErrors.user = "User selection is required";
    if (!product) formErrors.product = "Product selection is required";
    if (quantity < 1) formErrors.quantity = "Quantity must be at least 1";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Cart record updated successfully")
    }
  };

  return (
      <div>
        <h1 className="mt-4">Update Cart</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
          <li className="breadcrumb-item active">Update Cart</li>
        </ol>
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">User</label>
                    <select className="form-select" value={user} onChange={(e) => setUser(e.target.value)}>
                      <option value="" disabled>Select a user</option>
                      <option value="1">John Doe</option>
                      <option value="2">Jane Smith</option>
                    </select>
                    {errors.user && <div className="text-danger">{errors.user}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Product</label>
                    <select className="form-select" value={product} onChange={(e) => setProduct(e.target.value)}>
                      <option value="" disabled>Select a product</option>
                      <option value="101">Product A</option>
                      <option value="102">Product B</option>
                    </select>
                    {errors.product && <div className="text-danger">{errors.product}</div>}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
              </div>
              <button type="submit" className="btn btn-secondary">Update Cart</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default UpdateCart;