const db = require("../../database");
const { updatePublicationValidation } = require('../../validation/Publications');

const hasAccess = function (req, res, next) {
    if (req.user.role == "admin") {
        next()
    } else {
        db('publications')
            .select('user_id')
            .where({
                id: req.params.id
            })
            .then(publication => {
                if (publication[0].user_id == req.user.id) {
                    next()
                } else {
                    res.status(403).send({
                        message: "User has no access!"
                    })
                }
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
}

const validation = function (req, res, next) {
    const { error } = updatePublicationValidation(req.body);
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