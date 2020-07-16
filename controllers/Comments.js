const db = require("../database");

const store = function (req, res) {
    // res.send({
    //     p_id: req.params.id,
    //     u_id: req.user.id,
    //     text: req.body.text
    // })
    let data = {
        user_id: req.user.id,
        publication_id: req.params.id,
        text: req.body.text
    };
    db("comments")
        .insert(data) //to save
        .then(id => {
            return db("comments")
                .select("*")
                .where({
                    id: id[0]
                })
        })
        .then(comment => { //2 then, потому что ... (лучше не писать зен внутри зен, а выводить через ретурн)
            res.status(201).send(comment[0])
        })
        .catch(error => {
            res.status(500).send(error)
        });
};

const destroy = function (req, res) {
    db("comments")
        .where({
            id: req.params.comment_id
        })
        .delete()
        .then(id => {
            res.send({
                message: "The comment has been deleted"
            })
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

module.exports = {
    store,
    destroy
};


//insert update delete в then возвраз id. это в KNEX!!!