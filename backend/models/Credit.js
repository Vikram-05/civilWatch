import mongoose from 'mongoose';

const creditSchema = mongoose.Schema({
  representative_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  credit_score: {
    type: Number,
    default: 0
  },
  
  problem_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  feedback: {
    type: String,
    required: false
  },
  solved_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const creditModel = mongoose.model('Credit', creditSchema);
export default creditModel;
