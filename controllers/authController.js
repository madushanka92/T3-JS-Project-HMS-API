import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email }).populate('roleId').populate('departmentId');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.roleId, department: user.departmentId }, // Payload
      process.env.JWT_SECRET || 'your_secret_key', // Secret key from environment variable (you should store it securely)
      { expiresIn: '1h' } // Token expiry time
    );

    // Send back the token and user info
    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.roleId.roleName,
        department: user.departmentId.departmentName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
