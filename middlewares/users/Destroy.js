const db = require("../../database");

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

module.exports = {
    hasAccess
}
