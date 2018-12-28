const errors = require('restify-errors');
const FoodType = require('../models/FoodType');
const Company = require('../models/Company');
const Kitchen = require('../models/Kitchen');

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
    // Kitchen
    server.get('/kitchens', async (req, res, next) => {
        try {
            const kitchens = await Kitchen.find({});
            res.send(kitchens);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });

    server.post('/kitchens', async (req, res, next) => {
        const { kitchen_code, kitchen_name, kitchen_staff } = req.body;
        try {
            const kitchen = new Kitchen({
                kitchen_code, kitchen_name, kitchen_staff
            });
            const newKitchen = await kitchen.save();
            res.send({ status: 'success' });
            next();
            console.log('******************** Add Kitchen done ********************');
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    server.put('/kitchens/:id', async (req, res, next) => {
        try {
            const kitchen = Kitchen.findByIdAndUpdate({ _id: req.params.id }, req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });
    server.del('/kitchens/:id', async (req, res, next) => {
        try {
            const kitchen = await Kitchen.findByIdAndRemove({ _id: req.params.id });
            res.send({ status: 'success' });
            next();
            console.log('******************** delete done ' + id + ' ********************');
        } catch (err) {
            return next(new errors.InvalidContentError(err.message));
        }
    });

    // Upload File Photo
    

}
