const db = require("../../database");

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
};

module.exports = {
    hasAccess
}