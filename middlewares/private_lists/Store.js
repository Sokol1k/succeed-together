const { createPrivateListValidation } = require('../../validation/PrivateLists');

module.exports = function (req, res, next) {
    //validate the data before we make a user
    const { error } = createPrivateListValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    } else {
        next();
    }
};