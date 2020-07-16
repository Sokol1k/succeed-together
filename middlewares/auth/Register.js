const { registerValidation } = require('../../validation/Auth');

module.exports = function (req, res, next) {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    } else {
        next();
    }
};