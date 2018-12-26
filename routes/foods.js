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
    server.post('foods', async (req, res, next) => {
        //Check req is JSON
        if (!req.is('application/json')) { return next(new errors.InvalidContentError(err)); }
        try {

            const { }


            res.send(foods);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
}