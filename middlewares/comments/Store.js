const { commentValidation } = require('../../validation/Comments');

module.exports = function (req, res, next) {
    //validate the data before we make a user
    const { error } = commentValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    } else {
        next();
    }
};