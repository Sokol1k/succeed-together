const db = require("../../database");
const { updatePrivateListValidation } = require('../../validation/PrivateLists');

const hasAccess = function (req, res, next) {
    db('private_lists')
        .select('user_id')
        .where({
            id: req.params.id
        })
        .then(private_list => {
            if (private_list[0].user_id == req.user.id) {
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
};

const validation = function (req, res, next) {
    const { error } = updatePrivateListValidation(req.body);
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
};