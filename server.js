const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');

const app = express();
const port = 3001;


mongoose.connect('mongodb+srv://hiba_znbq:hiba@1999@cluster0.bs2mtri.mongodb.net/otp.otps?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const OtpModel = mongoose.model('Otp', otpSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hibahashir13@gmail.com', 
    pass: 'ElhamHahir123', 
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.use(express.json());

// Step 1: Send OTP to Email and Save to DB
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Your OTP for verification',
    text: `Your One-Time Password (OTP) is: ${otp}`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }

    console.log('Email sent: ' + info.response);

    try {
      const otpRecord = new OtpModel({ email, otp });
      await otpRecord.save();
    } catch (dbError) {
      console.error('Failed to save OTP to MongoDB:', dbError);
      return res.status(500).json({ error: 'Failed to save OTP to the database' });
    }

    res.json({ message: 'OTP sent successfully', otp });
  });
});

// Step 3: Validate OTP
app.post('/validate-otp', async (req, res) => {
  const { email, enteredOTP } = req.body;

  if (!email || !enteredOTP) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const otpRecord = await OtpModel.findOne({ email, otp: enteredOTP });

    if (otpRecord) {
      // OTP matched, redirect or provide access
      res.json({ message: 'OTP matched successfully', success: true });
    } else {
      // Invalid OTP
      res.status(401).json({ error: 'Invalid OTP', success: false });
    }
  } catch (error) {
    console.error('Error validating OTP:', error);
    res.status(500).json({ error: 'Failed to validate OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


