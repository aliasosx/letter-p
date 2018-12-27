const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const FoodtypeSchema = new mongoose.Schema({
    food_type_code: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
    },
    food_type_name: {
        type: String,
        unique: true,
        index: true,
        required: true,
        trim: true,
    },
    created_by: {
        type: String,
        required: true,
        trim: true,
    }

});
FoodtypeSchema.plugin(timestamp);
const Foodtype = mongoose.model('Food_type', FoodtypeSchema);
module.exports = Foodtype;