const { loginValidation } = require('../../validation/Auth');

module.exports = function (req, res, next) {
    //validate the data before we make a user
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    } else {
        next();
    }
};