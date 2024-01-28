import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const SendotpForm =  ({ onOTPSent }) => {
    const [email, setEmail] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
      
        const response = await fetch('http://localhost:3001/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          onOTPSent(data.otp);
        } else {
          console.error('Failed to send OTP:', data.error);
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Send OTP
      </Button>
    </form>
      

    </Box>
  </Container>
  )
}

export default SendotpForm

