import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Header = () => {    

    const history = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    const handlloginlogout = () => {
        if(userData?.id){
            localStorage.removeItem('userData');
            history('/login');
        }else{
            history('/login');
        }
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton edge="start" color="inherit" aria-label="cart">
                    <Badge color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                    upGrad E-Shop
                </IconButton>

                {
                    userData?.id &&
                    <div>
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            style={{ width: '500px', backgroundColor: '#92b5f4', margin: '0 16px' }} // Updated background color
                            InputProps={{
                                startAdornment: (
                                    <IconButton>
                                        {/* Add your search icon here */}
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>
                }
                <div>
                <Button color="inherit" onClick={() => history('/home')}>Home</Button>
                {
                    userData?.roles?.includes('ADMIN') &&
                    <Button color="inherit" onClick={() => history('/addProduct')}>Add product</Button>
                }
                <Button color="inherit" onClick={handlloginlogout} sx={{backgroundColor: 'red', color: 'white'}}>{ userData?.id ? 'Logout' : 'Login' }</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;