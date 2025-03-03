import mongoose from 'mongoose';
const severitySchema = mongoose.Schema({
    severity_name: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const SeverityModel = mongoose.model("Severity",severitySchema)
export default SeverityModel