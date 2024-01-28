import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const ValidateOTPForm = ({ onValidation }) => {
  const [otp, setOTP] = useState('');

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to validate OTP
      const response = await fetch('http://localhost:3001/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'hibahashir13@gmail.com', enteredOTP: otp }), 
      });

      const data = await response.json();

      if (response.ok) {
        onValidation(true);
      } else {
        onValidation(false, data.error);
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
    }
  };

  return (
    <Container maxWidth="sm">
            <Box mt={19}>
            <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        id="otp"
        label="Enter OTP"
        variant="outlined"
        value={otp}
        onChange={handleOTPChange}
        placeholder="Enter the OTP sent to your email"
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit OTP
      </Button>
    </form>
              
            </Box>
          </Container>
  );
};

export default ValidateOTPForm;
