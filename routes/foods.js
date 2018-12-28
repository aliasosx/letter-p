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
            const { food_name, food_type, photo_path, food_master, food_parents, cost, price, currcode, kitchen_code, created_by, is_enabled, enable_child } = req.body;
            const food = new Food({
                food_name, food_type, photo_path, food_master, food_parents, cost, price, currcode, kitchen_code, created_by, is_enabled, enable_child
            });
            const newFood = await food.save();
            res.send({ status: 'success ' });
            next();
            console.log('******************** Add Food done ********************');
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
    server.del('/foods/:id', async (req, res, next) => {
        console.log(req.body);
        try {
            const food = await Food.findOneAndRemove({ _id: req.params.id });
            res.send({ status: 'success' });
            next();
            console.log('******************** delete done ' + id + ' ********************');
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
    server.get('/masterfoods', async (req, res, next) => {
        console.log(req.body);
        try {
            const foodmasters = await Food.find({ food_master: 1, enable_child: 1 }, { food_name: 1, _id: 1 });
            res.send(foodmasters);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
}