import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import './home.css';
import { Button } from '@mui/material';
import { sampleImage } from '../pdp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const Home = () => {

    const history = useNavigate();

    const userData = JSON.parse(localStorage.getItem('userData'));

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('default'); // Default sorting option
    const [selectedCategory, setSelectedCategory] = useState("All"); // State to track selected category
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {       
        fetchCategories();
        fetchProducts();
    }, []);

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products/categories');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Function to sort products based on selected option
    const sortProducts = (option) => {
        let sortedProducts = [...products];
        switch (option) {
            case 'priceHighToLow':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'priceLowToHigh':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'newest':
                sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                break;
        }
        return sortedProducts;
    };

    // Function to delete a product
    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            // Optionally, you can refresh the product list after deletion
            fetchProducts(); // Refresh the product list
        } catch (error) {
            toast.error(`Error deleting product: ${productId}`);
        }
    };

    return (
        <div className='home-page'>
            {loading ? ( // Show loading indicator if loading
                <div className="product-list">
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                    <div className="product-card skeleton"></div>
                </div>
            ) : (
                <>
                    <div className="category-tabs">
                        <button 
                            key={'All'} 
                            className={`category-button ${selectedCategory === 'All' ? 'selected' : ''}`} 
                            onClick={() => setSelectedCategory("All")} // Update selected category on click
                        >
                            All {/* Assuming category has a name property */}
                        </button>
                        {categories.map(category => (
                            <button 
                                key={category} 
                                className={`category-button ${selectedCategory === category ? 'selected' : ''}`} 
                                onClick={() => setSelectedCategory(category)} // Update selected category on click
                            >
                                {category} {/* Assuming category has a name property */}
                            </button>
                        ))}
                    </div>
                    <div className="sort-dropdown">
                        <label htmlFor="sort">Sort by:</label>
                        <select 
                            id="sort" 
                            value={sortOption} 
                            onChange={(e) => setSortOption(e.target.value)} // Update sort option on change
                        >
                            <option value="default">Default</option>
                            <option value="priceLowToHigh">Price: Low to High</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                        </select>
                    </div>
                    <div className="product-list">
                        {sortProducts(sortOption).filter(product => 
                            selectedCategory !== "All" ? product?.category === selectedCategory : true // Filter products by selected category
                        ).map(product => (
                            <div key={product?.id} className="product-card">
                                <div className="product-content">
                                    <img src={product?.imageUrl || sampleImage} alt={product?.name} className="product-image" />
                                    <h5 className="product-name">{product?.name}</h5>
                                    <h5 className="product-description">{product?.description}</h5>
                                    <p className="product-price">${product?.price}</p>
                                </div>
                                <div className="product-actions">
                                    <Button variant="contained" color="primary" onClick={() => history(`/pdp/${product?.id}`)}>BUY</Button>
                                    {
                                        // userData?.roles?.includes('ADMIN') &&
                                        <div>
                                            <EditIcon onClick={() => history(`/editProduct/${product?.id}`)} style={{cursor: 'pointer', color: 'gray',marginRight: '1rem'}} />
                                            <DeleteIcon onClick={() => deleteProduct(product?.id)} style={{cursor: 'pointer', color: 'gray'}} /> {/* Updated to call deleteProduct */}
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
