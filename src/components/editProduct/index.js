import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField'; // Import MUI TextField
import Button from '@mui/material/Button'; // Import MUI Button
import { Snackbar } from '@mui/material'; // Import Snackbar for error messages
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    
    const navigate = useNavigate();

    const { id } = useParams(); // Get the product ID from URL params
    const [product, setProduct] = useState(null);
    const [errors, setErrors] = useState({}); // State for error messages
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

    useEffect(() => {        
        fetchProduct();
    }, [id]);

    // Fetch product data using the ID
    const fetchProduct = async () => {
        const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`); // Adjust the API endpoint as needed
        const data = await response.json();
        setProduct(data);
    };

    const handleSubmit = async (e) => { // Updated to async
        e.preventDefault();
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setOpenSnackbar(true); // Show error message
            return;
        }
        
        // Send PUT request to save the product
        try {
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, { // Updated API call
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // Send updated product data
            });
    
            if (!response.ok) {
                throw new Error('Failed to save product'); // Handle error response
            }
            navigate('/home');
            // Optionally handle success (e.g., redirect or show a success message)
        } catch (error) {
            console.error(error);
            setOpenSnackbar(true); // Show error message
        }
    };

    const validateFields = () => {
        const validationErrors = {};
        if (!product.name) validationErrors.name = "Name is required";
        if (!product.category) validationErrors.category = "Category is required";
        if (!product.price) validationErrors.price = "Price is required";
        if (!product.description) validationErrors.description = "Description is required";
        if (!product.manufacturer) validationErrors.manufacturer = "Manufacturer is required";
        if (!product.availableItems) validationErrors.availableItems = "Available Items are required";
        if (!product.imageUrl) validationErrors.imageUrl = "Image URL is required";
        return validationErrors;
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    if (!product) return <div>Loading...</div>; // Loading state

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%'}}>
            <TextField
                error={!!errors.name}
                helperText={errors.name}
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                label="Name"
                fullWidth
                required
            />
            <TextField
                error={!!errors.category}
                helperText={errors.category}
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                label="Category"
                fullWidth
                required
            />
            <TextField
                error={!!errors.price}
                helperText={errors.price}
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                label="Price"
                type="number"
                fullWidth
                required
            />
            <TextField
                error={!!errors.description}
                helperText={errors.description}
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                label="Description"
                multiline
                fullWidth
                required
            />
            <TextField
                error={!!errors.manufacturer}
                helperText={errors.manufacturer}
                value={product.manufacturer}
                onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
                label="Manufacturer"
                fullWidth
                required
            />
            <TextField
                error={!!errors.availableItems}
                helperText={errors.availableItems}
                value={product.availableItems}
                onChange={(e) => setProduct({ ...product, availableItems: e.target.value })}
                label="Available Items"
                type="number"
                fullWidth
                required
            />
            <TextField
                error={!!errors.imageUrl}
                helperText={errors.imageUrl}
                value={product.imageUrl}
                onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                label="Image URL"
                fullWidth
                required
            />
            <Button type="submit" variant="contained">Save</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Please fill in all required fields."
            />
        </form>
    );
};

export default EditProduct;
