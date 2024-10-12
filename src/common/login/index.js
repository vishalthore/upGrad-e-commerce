import React, { useEffect } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const history = useNavigate();

    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [loginError, setLoginError] = React.useState(''); // State for login error
    const [loinLoader, setLoinLoader] = React.useState(false);

    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {

        if(userData?.id){
            console.log("userData", userData);
            history('/home');
        }
     
    }, [userData])

    const validateEmail = (value) => {
        // Simple email regex for validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(validateEmail(value) ? '' : 'Invalid email address');
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value) ? '' : 'Password must be at least 6 characters long and contain a number');
    };

    const validatePassword = (value) => {
        // Password must be at least 6 characters long and contain at least one number
        // const regex = /^(?=.*[0-9]).{6,}$/;
        // return regex.test(value);
        return value?.trim()?.length > 0;
    };

    const handleLogin = async () => {
        if(email?.trim()?.length === 0 || password?.trim()?.length === 0){
            setLoginError('Please enter your email and password');
            return;
        }
        setLoinLoader(true);
        try {
            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });

            if (!response.ok) {
                setLoinLoader(false);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('userData', JSON.stringify(data)); // Save response in local storage
            setLoinLoader(false);
            history('/home');
            // Handle successful login (e.g., redirect or store token)
        } catch (error) {
            setLoginError('Login failed. Please check your credentials.'); // Set login error message
            console.error('Login error:', error);
            setLoinLoader(false);
        }
    };

    return (
        <div>
        <Box 
            sx={{ 
                maxWidth: 500, 
                margin: 'auto', 
                // textAlign: 'center' 
            }}
        >
            <h1>Sign in</h1>
            
            <TextField 
                label="Email Address*" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                error={!!emailError} // Show error state
                helperText={emailError} // Display error message
                onChange={handleEmailChange} // Handle email change
            />
          
            <TextField 
                label="Password*" 
                type="password" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                error={!!passwordError} // Show error state
                helperText={passwordError} // Display error message
                onChange={handlePasswordChange} // Handle password change
            />
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}  
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin} disabled={loinLoader} style={{ margin:"10px 0px"}}>
                {
                    loinLoader ? <CircularProgress size={23} style={{color: 'white'}} /> : 'SIGN IN'
                }
            </Button> {/* Call handleLogin on click */}
        </Box>
            <div onClick={() => history('/signup')} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Don't have an account? Sign Up</div>
        </div>
    )
}

export default Login;