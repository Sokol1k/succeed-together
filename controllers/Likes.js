const db = require("../database");

const storeOrDestroy = function (req, res) {
    db("likes")
        .select("*")
        .where({
            publication_id: req.params.id,
            user_id: req.user.id
        })
        .then(like => {
            if (like.length) {
                let destroy = db("likes")
                    .where({ id: like[0].id })
                    .delete();
                let message = "The like has been deleted";
                return Promise.all([destroy, message]);
            } else {
                let data = {
                    publication_id: req.params.id,
                    user_id: req.user.id
                };
                let create = db("likes").insert(data);
                let message = "The like has been created";
                return Promise.all([create, message]);
            }
        })
        .then(result => {
            res.send({ message: result[1] });
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

module.exports = {
    storeOrDestroy
};
