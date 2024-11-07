import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    contactNumber: { type: String },
    address: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;