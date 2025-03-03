import mongoose from 'mongoose';


const reviewSchema = mongoose.Schema({
  problem_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false
  },
  feedback: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;