import './address.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TextField, Button, Select, MenuItem } from '@mui/material'; // {{ edit_1 }} Import Select and MenuItem from MUI
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // {{ edit_1 }} Import useHistory from react-router-dom
import { ToastContainer, toast } from 'react-toastify'; // {{ edit_1 }} Import toast notification library
import 'react-toastify/dist/ReactToastify.css'; // {{ edit_1 }} Import toast styles

const Address = () => {
    const history = useNavigate(); // {{ edit_2 }} Initialize useHistory
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        street: '',
        city: '',
        state: '',
        landmark: '',
        zipcode: ''
    });

    const [errors, setErrors] = useState({});
    const [addresses, setAddresses] = useState([]); // {{ edit_1 }} Array to store addresses
    const [selectedAddress, setSelectedAddress] = useState([]); // {{ edit_2 }} State for selected address

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddressSelect = (e) => { // {{ edit_3 }} Handle address selection
        const selected = addresses[e.target.value];
        setSelectedAddress(e.target.value);
        setFormData(selected || {}); // Populate form with selected address
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
        if (!formData.street) newErrors.street = 'Street is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipcode) newErrors.zipcode = 'Zipcode is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (!selectedAddress) { // {{ edit_3 }} Check if an address is selected
            toast.error('You must select an address'); // Show error toast
            return;
        }
        if (Object.keys(validationErrors).length === 0) {
            setAddresses([...addresses, formData]); // {{ edit_4 }} Add new address to the array
            console.log(formData);
            setFormData({ // Reset form after submission
                name: '',
                contactNumber: '',
                street: '',
                city: '',
                state: '',
                landmark: '',
                zipcode: ''
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => { // {{ edit_3 }} Implement handleBack function
        history(-1); // Navigate to the previous page
    };

    const handleNext = () => { // {{ edit_3 }} Implement handleNext function
        console.log("selectedAddress",selectedAddress);
        if(Object.keys(selectedAddress).length > 0) {
            localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress)); // {{ edit_4 }} Save selected address to local storage
            history('/confirm'); // Navigate to the next page
        } else {
            toast.error('You must select an address'); // Show error toast
        }
    };

    return (
        <div className="address-container">
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
            /> {/* {{ edit_4 }} Add ToastContainer for notifications */}
            <div className="progress-indicator">
                <div className="progress-item checked"><CheckCircleIcon style={{fontSize: '1.2rem', color: 'blue'}} /> Items</div>
                <div className="progress-item-line">---------------</div>
                <div className="progress-item active"><span>02</span>Address</div>
                <div className="progress-item-line">----------------</div>
                <div className="progress-item disabled"><span>03</span>Confirm Order</div>
            </div>
            <Select
                onChange={handleAddressSelect}  
                value={selectedAddress}
                style={{ width: '50%', margin: 'auto' }} // {{ edit_2 }} Use MUI Select
            >
                {/* <MenuItem value=""><em>Select Address</em></MenuItem>  */}
                {addresses.map((address, index) => (
                    <MenuItem key={index} value={address}>{address.street}, {address.city}</MenuItem> // {{ edit_4 }} Map addresses to MenuItems
                ))}
            </Select>
            <h1>Address</h1>
            <form onSubmit={handleSubmit} style={{width: '50%', margin: 'auto'}}>
                <TextField
                    size='small'
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    size='small'
                    name="contactNumber"
                    label="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    size='small'
                    name="street"
                    label="Street"
                    value={formData.street}
                    onChange={handleChange}
                    error={!!errors.street}
                    helperText={errors.street}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    size='small'
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    size='small'
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={handleChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    size='small'
                    name="landmark"
                    label="Landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    error={!!errors.landmark}
                    helperText={errors.landmark}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    size='small'
                    name="zipcode"
                    label="Zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    error={!!errors.zipcode}
                    helperText={errors.zipcode}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Add Address</Button>
                
                <div style={{ marginTop: '10px' }}>
                    <Button variant="outlined" color="secondary" onClick={handleBack}>Back</Button>
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleNext}>Next</Button>
                </div>
            </form>
        </div>
    );
};

export default Address;