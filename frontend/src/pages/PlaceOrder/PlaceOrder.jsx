import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StorContext } from '../../context/StorContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const PlaceOrder = ({ url = "http://localhost:8000" }) => { 
    const { getTotalCartAmount, cartItems } = useContext(StorContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (cartItems && Object.keys(cartItems).length > 0) {
            const firstBookId = Object.keys(cartItems)[0]; 
            const firstBook = cartItems[firstBookId]; 
            setImageUrl(`${url}/uploads/${firstBook.image || 'placeholder.png'}`);
        } else {
            setImageUrl(`${url}/uploads/placeholder.png`); 
        }
    }, [cartItems, url]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: '',
        });

        toast.info("Processing your order...");

        try {
            const response = await axios.post(`${url}/place-order`, {
                ...formData,
                cartItems,
                totalAmount: getTotalCartAmount() + 20,
            });

            if (response.data?.success) {
                toast.success("Order placed successfully!");
            } else {
                toast.error("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className='place-order' onSubmit={handleSubmit}>
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input
                            type="text"
                            placeholder='First name'
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder='Last name'
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <input
                        type="email"
                        placeholder='Email address'
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Street'
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="multi-fields">
                        <input
                            type="text"
                            placeholder='City'
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder='State'
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="multi-fields">
                        <input
                            type="text"
                            placeholder='Zip code'
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder='Country'
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <input
                        type="tel"
                        placeholder='Phone'
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="place-order-right">
                    <div className="cart-summary">
                        <div className="cart-total">
                            <h2>Cart Total</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>${getTotalCartAmount() === 0 ? 0 : 20}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
                                </div>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Placing Order..." : "Proceed To Payment"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <ToastContainer /> 
        </div>
    );
};

export default PlaceOrder;
