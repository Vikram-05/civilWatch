import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const AdminModel = mongoose.model('Admin', adminSchema);
export default AdminModel
