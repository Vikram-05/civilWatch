import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    //   },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['citizen', 'representative'],
        required: true
      },
      location: {
        type: String, 
        required: false
      },
      state: {
        type: String,
        required: false
      },
      district: {
        type: String,
        required: false
      },
      wardNumber: {
        type: Number,
        required: false
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      updated_at: {
        type: Date,
        default: Date.now
      }
},{
    timestamps : true
})

const UserModel = mongoose.model("User",userSchema)
export default UserModel