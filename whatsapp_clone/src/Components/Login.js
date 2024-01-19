import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../Styles/Login.css';

function Login() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {
        sessionStorage.setItem("user", JSON.stringify({
            username: user,
            lastSeen: new Date().toString,
            avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user}}`
        }));
        navigate("/chats");
    }
    return (
        <div className='login'>
            <div className='login_content'>
                <div className='login_contentHeader'>
                    <img src='/favicon.ico' alt='WhatsApp Icon' />
                    <h3>Sign in to WhatsApp</h3>
                </div>
                <div className='login_contentBody'>
                    <TextField
                        sx={{ width: '65%' }}
                        label="Username"
                        placeholder='Enter your username'
                        variant="standard"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        error={!user || user.trim().length === 0}
                        id={user && user.trim().length > 0 ? "outlined-primary-helper-text" : "outlined-error-helper-text"}
                        required
                    />
                    <Button sx={{ width: '65%', marginTop: '10px' }} disabled={!user || user.trim().length === 0} color='success'
                        variant='contained'
                        onClick={handleLogin}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login