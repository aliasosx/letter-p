const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const FoodSchema = new mongoose.Schema({
    food_name: {
        type: String,
        require: true,
        trim: true,
    },
    food_type: {
        type: String,
        require: true,
        trim: true,
    },
    photo_path: {
        type: String,
        require: true,
        trim: true,
    },
    food_master: {
        type: Number,
        require: true,
        default: 0
    },
    food_parents: {
        type: Number,
        require: true,
        default: 0,
    },
    cost: {
        type: Number,
        require: true,
        default: 0
    },
    price: {
        type: Number,
        require: true,
        default: 0
    },
    kitchen_code: {
        type: String,
        require: true,
        trim: true,
    },
    created_by: {
        type: String,
        require: true,
        trim: true,
    },
    is_enabled: {
        type: Number,
        require: true,
        default: 1
    }

});
FoodSchema.plugin(timestamp);
const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;