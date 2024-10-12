import { TextField, Button } from '@mui/material'; // Import MUI components
import { useEffect, useState } from 'react'; // Import useState for managing form state
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const history = useNavigate();

    const [formData, setFormData] = useState({ // Combined state for all inputs
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        role: '',
    });
    const [formErrors, setFormErrors] = useState({}); // State for form validation errors

    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {

        if(userData?.id){
            console.log("userData", userData);
            history('/home');
        }
     
    }, [userData])

    const validateForm = (userData) => {
        const errors = {};
        if (!userData.email) errors.email = "Email is required";
        if (!userData.password) errors.password = "Password is required";
        // Add more validations as needed
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            contactNumber: formData.get('contactNumber'),
            role: formData.get('role') || undefined,
        };

        const errors = validateForm(userData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors); // Set validation errors
            return;
        }

        const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            // Handle successful signup
            console.log('Signup successful');
            history('/login');
        } else {
            // Handle errors
            console.error('Signup failed');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Validate contactNumber to accept only numeric values
        if (name === 'contactNumber' && isNaN(value)) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                contactNumber: 'Contact Number must be numeric',
            }));
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data

        // Update form errors in real-time for all fields
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        }));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '500px' }}>
                <div> <h1>Sign up</h1> </div>
                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    required
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    onChange={handleChange} // Real-time validation
                    fullWidth // Added fullWidth prop
                    style={{ margin: '10px 0' }} // Added margin
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    required
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    onChange={handleChange} // Real-time validation
                    fullWidth // Added fullWidth prop
                    style={{ margin: '10px 0' }} // Added margin
                />
                <TextField
                    type="text"
                    name="firstName"
                    label="First Name"
                    required
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                    onChange={handleChange} // Real-time validation
                    fullWidth // Added fullWidth prop
                    style={{ margin: '10px 0' }} // Added margin
                />
                <TextField
                    type="text"
                    name="lastName"
                    label="Last Name"
                    required
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                    onChange={handleChange} // Real-time validation
                    fullWidth // Added fullWidth prop
                    style={{ margin: '10px 0' }} // Added margin
                />
                <TextField
                    type="text"
                    name="contactNumber"
                    label="Contact Number"
                    required
                    error={!!formErrors.contactNumber}
                    helperText={formErrors.contactNumber}
                    onChange={handleChange} // Real-time validation
                    fullWidth // Added fullWidth prop
                    style={{ margin: '10px 0' }} // Added margin
                />
                <TextField
                    type="text"
                    name="role"
                    label="Role (optional for admin)"
                    fullWidth // Added fullWidth prop
                    style={{ margin: '10px 0' }} // Added margin
                />
                <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Signup</Button>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <div onClick={() => history('/login')} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Already have an account? Signin</div>
                </div>
                
            </form>
        </div>
    );
}

export default Signup;