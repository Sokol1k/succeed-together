const db = require("../../database");

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

module.exports = {
    hasAccess
};