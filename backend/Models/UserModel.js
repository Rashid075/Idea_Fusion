const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true,
        minlength: 10
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },linkedin: {
        type: String,
      },
      github: {
        type: String,
      }, profileImage: {
        data: Buffer, 
        contentType: String 
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
