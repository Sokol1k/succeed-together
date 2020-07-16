const db = require("../../database");
const {
    updateRoleUserValidation
} = require('../../validation/Users');

const hasAccess = function (req, res, next) {
    if (req.user.role == "admin") {
        next()
    } else {
        res.status(403).send({
            message: "User has no access!"
        })
    }
}

const validation = function (req, res, next) {
    const {
        error
    } = updateRoleUserValidation(req.body);
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