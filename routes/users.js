const errors = require('restify-errors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
const uuidv4 = require('uuid/v4');


module.exports = server => {
    server.post('/register', async (req, res, next) => {

        try {
            const { employee_code, gender, username, email, mobile, fullname, dateOfBirth, employ_date, photo, role, password } = req.body;
            //const { employee_code } = uuidv4();
            const user = new User({
                employee_code, gender, username, email, mobile, fullname, dateOfBirth, employ_date, photo, role, password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    // hash password
                    user.password = hash;
                    //save user
                    try {
                        const newUser = await user.save();
                        res.send(201);
                        next();
                    } catch (err) {
                        return next(new errors.InternalError(err.message));
                    }
                });
            });
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }


    });
    server.get('/users', async (req, res, next) => {
        try {
            const users = await User.find({}, { password: 0 });
            res.send(users);
            next();
        } catch (err) {
            next(new errors.InvalidContentError('Record not found'));
        }
    });

    // Auth
    server.post('/auth', async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const user = await auth.authenticate(username, password);

            //Create token

            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '24h',
            });
            const { iat, exp } = jwt.decode(token);
            console.log(user);
            res.send({ iat, exp, token });
            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err));
        }
    });

    server.del('/users/:id', async (req, res, next) => {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });
    server.put('/users/:id', async (req, res, next) => {
        console.log(req.params.id);
        console.log(req.body);
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send({ status: 'success' });
            next();
        } catch (err) {
            return next(errors.InvalidContentError(err.message));
        }

    });

}