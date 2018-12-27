const errors = require('restify-errors');
const FoodType = require('../models/FoodType');
const Company = require('../models/Company');


module.exports = server => {
    // Food Type route
    server.get('/foodtypes', async (req, res, next) => {
        try {
            const foodTypes = await FoodType.find({});
            res.send(foodTypes);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    server.post('/foodtypes', async (req, res, next) => {

        const { food_type_code, food_type_name, created_by } = req.body;
        const foodTypes = new FoodType({
            food_type_code, food_type_name, created_by
        });
        try {
            const foodtype = await foodTypes.save();
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    server.put('/foodtypes/:id', async (req, res, next) => {
        try {
            const foodtype = await FoodType.findByIdAndUpdate({ _id: req.params.id }, req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });

    server.del('/foodtypes/:id', async (req, res, next) => {
        try {
            const foodtype = await FoodType.findByIdAndRemove({ _id: req.params.id });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    // Company route
    server.get('/companyinfo', async (req, res, next) => {
        try {
            const company = await Company.find({});
            res.send(company);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    server.post('/companyinfo', async (req, res, next) => {
        const { company_code, company_name } = req.body;
        const company = new Company({
            company_code, company_name
        });
        try {
            const newCompany = await company.save();
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });

}
