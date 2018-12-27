const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CompanySchema = new mongoose.Schema({
    company_code: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    company_name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    }
});
CompanySchema.plugin(timestamp);
const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;