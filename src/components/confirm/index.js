import './confirm.css';
import React, { useState } from 'react'; // Import useState
import Dialog from '@mui/material/Dialog'; // Import Dialog
import DialogActions from '@mui/material/DialogActions'; // Import DialogActions
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent
import DialogTitle from '@mui/material/DialogTitle'; // Import DialogTitle
import Button from '@mui/material/Button'; // Import Button
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
    const navigate = useNavigate();
    // Retrieve data from local storage
    const product = JSON.parse(localStorage.getItem('selectedProduct')) || [];
    const producDetails = product?.product;
    const quantity = product?.quantity;
    const address = JSON.parse(localStorage.getItem('selectedAddress')) || {};
    console.log(product, producDetails, quantity, address);

    // State to manage dialog open/close
    const [open, setOpen] = useState(false);

    // Function to handle button click
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to close the dialog
    const handleClose = () => {
        navigate('/home');
        setOpen(false);
    };

    return (
        <div className="confirm">
            <h2>Billing Invoice</h2>
            <div className="invoice-card">
                <div className="product-details">
                    <h3>Products:</h3>
                        <div className="product-item">
                            <h4>{producDetails?.name}</h4>
                            <p>Quantity: {quantity}</p>
                            <div>Price: ₹{producDetails?.price}</div>
                            <div>Description: {producDetails?.description}</div>
                            <div>Manufacturer: {producDetails?.manufacturer}</div>
                            <div>Total Cost : ₹{producDetails?.price * quantity}</div>
                        </div>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Place Order
                        </Button>
                </div>
                <div className="address">
                    <h3>Address:</h3>
                    <p>{address?.name}</p>
                    <p>{address?.street}, {address?.city}, {address?.state}, {address?.zipcode}</p>
                    <p>Contact: {address?.contactNumber}</p>
                </div>
                
                {/* Dialog for order confirmation */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Order Confirmation</DialogTitle>
                    <DialogContent>
                        <p>Order placed successfully!</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" variant="contained">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Confirm;
