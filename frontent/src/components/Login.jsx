import React , { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
      
        const handleSubmit = async(e) => {
          e.preventDefault();
          try {
            // Make a POST request to the backend
            const response = await fetch('http://localhost:3001/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
      
            const data = await response.json();
      
            // Update state based on the response
            if (response.ok) {
              setOtp(data.otp);
              setMessage('OTP sent successfully');
            } else {
              setMessage(data.error || 'Failed to send OTP');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    
        };
      
        return (
          <Container maxWidth="sm">
            <Box mt={19}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="secondary" fullWidth>
                  Submit
                </Button>
              </form>
              {message && <p>{message}</p>}
        {otp && <p>OTP: {otp}</p>}
     
            </Box>
          </Container>
    );
  };
   

export default Login
