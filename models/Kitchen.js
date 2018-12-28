const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const KitchentSchema = new mongoose.Schema({
    kitchen_code: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    kitchen_name: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
    kitchen_staff: {
        type: String,
        require: true,
        unique: true,
        index: true,
        trim: true,
    },
});
KitchentSchema.plugin(timestamp);
const kitchen = mongoose.model('kitchen', KitchentSchema);

module.exports = kitchen;