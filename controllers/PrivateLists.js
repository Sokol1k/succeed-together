const db = require("../database");

const index = function (req, res) {
    db("private_lists")
        .select("*")
        .where({
            user_id: req.user.id
        })
        .orderBy('favourite', 'desc')
        .orderBy('index')
        .then(private_lists => {
            res.send(private_lists);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

const store = function (req, res) {
    let data = {
        user_id: req.user.id,
        title: req.body.title,
        index: req.body.index
    };
    db("private_lists")
        .insert(data)
        .then(id => {
            res.status(201).send('The private list has been created');
        })
        .catch(error => {
            res.status(500).send(error);
        })
};

const update = function (req, res) {
    db("private_lists")
        .where({
            id: req.params.id
        })
        .update({
            title: req.body.title,
            favourite: req.body.favourite,
            index: req.body.index
        })
        .then(id => {
            res.send("The private list has been updated");
        })
        .catch(error => {
            res.status(500).send(error);
        })
};

const destroy = function (req, res) {
    db("private_lists")
        .where({
            id: req.params.id
        })
        .delete()
        .then(id => {
            res.send({
                message: "The private list has been deleted"
            })
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

module.exports = {
    index,
    store,
    update,
    destroy
};