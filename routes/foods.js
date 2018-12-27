const errors = require('restify-error');
const Food = require('../models/Food');

module.exports = server => {
    server.get('/foods', async (req, res, next) => {
        try {
            const foods = await Food.find({});
            res.send(foods);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
    server.post('/foods', async (req, res, next) => {
        console.log(req.body);
        try {
            const { food_name, food_type, photo_path, food_master, food_parents, cost, price, currcode, kitchen_code, created_by, is_enabled } = req.body;
            const food = new Food({
                food_name, food_type, photo_path, food_master, food_parents, cost, price, currcode, kitchen_code, created_by, is_enabled
            });
            const newFood = await food.save();
            res.send({ status: 'success ' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
}