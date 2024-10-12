import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import './pdp.css'; // Import CSS file
import TextField from '@mui/material/TextField'; // Import TextField from Material-UI

export const sampleImage = "https://media.istockphoto.com/id/1407127841/photo/white-sneaker-with-colored-accents-on-a-green-gradient-background-mens-fashion-sport-shoe-air.jpg?s=612x612&w=0&k=20&c=h4PYQPT0vzv3QOgAHql4eSdbnfHdmgm5ewURKdzqk6c=";

const Pdp = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the id from URL parameters
  const [product, setProduct] = useState({}); // State to hold product data
  const [loading, setLoading] = useState(false); // New state for loading
  const [quantity, setQuantity] = useState(1); // New state for quantity

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`); // Fetch product data
        const data = await response.json();
        setProduct(data); // Set product data to state
      } catch (error) {
        console.error('Error fetching product:', error); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct(); // Call the fetch function
  }, [id]); // Dependency array to refetch if id changes

  const handlePlaceOrder = () => {
    // Store product info and quantity in local storage
    localStorage.setItem('selectedProduct', JSON.stringify({ product, quantity }));
    navigate('/address');
  };

  const productContent = loading ? ( // Extracted loading check
    <p className="loading">Loading...</p> // Added class for loading state
  ) : product ? ( 
    <div className="pdp-product-details" style={{ display: 'flex' }}> {/* Added flex display for layout */}
      <img src={product.imageUrl || sampleImage} alt={product.name} className="product-image" style={{ width: '27rem', marginRight: '20px' }} /> {/* Adjusted image style */}
      <div> {/* New div for product info */}
        <h1 className="pdp-product-name">{product.name}</h1>
        <p className="pdp-product-category">Category: <strong>{product.category}</strong></p>
        <p className="pdp-product-manufacturer">Manufacturer: <strong>{product.manufacturer}</strong></p>
        <p className="pdp-product-description">{product.description}</p>
        <p className="pdp-product-price">Price: <strong>${product.price}</strong></p>
        <p className="pdp-product-available-items">Available Items: <strong>{product.availableItems}</strong></p>
        <div className="pdp-quantity-container">
        <TextField 
          label="Enter quantity" // Added label for the TextField
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          inputProps={{ min: 1 }} // Set min value for the input
          className="quantity-input" // Added class for quantity input
          sx={{width: '10rem'}}
        />
        <button className="order-button" onClick={handlePlaceOrder}>Place Order</button> {/* Added button for placing order */}
        </div>
      </div>
    </div>
  ) : (
    <p>No product found.</p> 
  );

  return (
    <div className="pdp-container"> 
      {productContent} 
    </div>
  );
};

export default Pdp;