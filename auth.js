const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //find user
            const user = await User.findOne({ username });
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    //Password wrong
                    reject('Authentication failed');
                }
            });
        } catch (err) {
            reject('Authentication failed');

        }
    })
}