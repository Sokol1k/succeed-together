const db = require("../../database");
const { updateUserValidation } = require('../../validation/Users');

const hasAccess = function (req, res, next) {
    if (req.user.role == "admin") {
        next()
    } else {
        if(req.user.id == req.params.id){
            next();
        } else {
            res.status(403).send({
                message: "User has no access!"
            })
        }
    }
}

const validation = function (req, res, next) {
    const { error } = updateUserValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    } else {
        next();
    }
}

module.exports = {
    hasAccess,
    validation
}