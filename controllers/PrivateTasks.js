const db = require("../database");

const index = function (req, res) {
    let result = db("private_tasks")
        .select("id", "text", "status", "favourite", "date", "deadline")
        .where({
            private_list_id: req.params.id
        });
    if (req.query.search) {
        result.where('text', 'like', `%${req.query.search}%`);
    }
    result.orderBy('date', 'desc')
        .orderBy('deadline', 'desc')
        .then(private_tasks => {
            res.send(private_tasks);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

const store = function (req, res) {
    let data = {
        private_list_id: req.params.id,
        text: req.body.text,
        date: req.body.date,
        deadline: req.body.deadline
    };
    db("private_tasks")
        .insert(data)
        .then(id => {
            res.send({
                message: "The task has been created"
            })
        })
        .catch(error => {
            res.status(500).send(error)
        });
};

const update = function (req, res) {
    db("private_tasks")
        .where({
            id: req.params.id
        })
        .update({
            text: req.body.text,
            status: req.body.status,
            favourite: req.body.favourite,
            date: req.body.date,
            deadline: req.body.deadline
        })
        .then(id => {
            res.send({
                message: "The task has been updated"
            })
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

const destroy = function (req, res) {
    db("private_tasks")
        .where({
            id: req.params.id
        })
        .delete()
        .then(id => {
            res.send({
                message: "The task has been deleted"
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