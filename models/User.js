const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
    employee_code: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    gender: {
        type: String,
        require: true,
        trim: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    fullname: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        require: true,
        trim: true,
    },
    employ_date: {
        type: Date,
        require: true,
        trim: true,
    },
    photo: {
        type: String,
        require: true,
        trim: true,
    },
    role: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    menu: {
        type: Array,
        trim: true,
    }
});
UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;

