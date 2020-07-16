const db = require("../database");

const index = function (req, res) {
    db("publications")
        .select("*")
        .orderBy("updated_at", "desc")
        .then(async publications => {
            for (let i = 0; i < publications.length; i++) {
                publications[i].likes = await db("likes")
                    .select("user_id")
                    .where({ publication_id: publications[i].id })
                    .then(likes => {
                        likes.forEach(like => {
                            if (like.user_id === req.user.id) {
                                publications[i].isLike = true;
                            }
                        })
                        return likes;
                    })
                    .catch(error => {
                        res.status(500).send(error);
                    });
                publications[i].comments = await db("comments")
                    .select("user_id", "text")
                    .where({ publication_id: publications[i].id })
                    .orderBy("created_at", "desc")
                    .then(comments => comments)
                    .catch(error => {
                        res.status(500).send(error);
                    });
            }
            res.send(publications);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

const indexFollowing = function (req, res) {
    db('publications')
        .innerJoin('followers', 'publications.id', 'followers.follower_id')
        .select('publications.*')
        .where({ 'followers.user_id': req.user.id })
        .orderBy("updated_at", "desc")
        .then(async publications => {
            for (let i = 0; i < publications.length; i++) {
                publications[i].likes = await db("likes")
                    .select("user_id")
                    .where({ publication_id: publications[i].id })
                    .then(likes => {
                        likes.forEach(like => {
                            if (like.user_id === req.user.id) {
                                publications[i].isLike = true;
                            }
                        })
                        return likes;
                    })
                    .catch(error => {
                        res.status(500).send(error);
                    });
                publications[i].comments = await db("comments")
                    .select("user_id", "text")
                    .where({ publication_id: publications[i].id })
                    .orderBy("created_at", "desc")
                    .then(comments => comments)
                    .catch(error => {
                        res.status(500).send(error);
                    });
            }
            res.send(publications);
        })
        .catch(error => {
            res.status(500).send(error);
        });

}

const show = function (req, res) {
    let publication = db("publications")
        .select("*")
        .where({ id: req.params.id });
    let likes = db("likes")
        .select("user_id")
        .where({ publication_id: req.params.id });
    let comments = db("comments")
        .select("user_id", "text")
        .where({ publication_id: req.params.id });
    Promise.all([publication, likes, comments])
        .then(result => {
            let publication = result[0][0]; //обратились к объекту, который находится в двумерном массиве
            publication.likes = result[1];
            publication.comments = result[2];
            res.send(publication);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

const store = function (req, res) {
    let data = {
        user_id: req.user.id,
        title: req.body.title,
        description: req.body.description
    };
    //promise
    db("publications")
        .insert(data)
        .then(id => {
            return db("publications")
                .select("*")
                .where({ id: id[0] });
        })
        .then(publication => {
            res.status(201).send(publication[0]);
        })
        .catch(error => {
            res.status(500).send(error);
        });;
};

const update = function (req, res) {
    db("publications")
        .where({ id: req.params.id })
        .update({
            title: req.body.title,
            description: req.body.description,
            updated_at: db.fn.now()
        })
        .then(id => {
            let publication = db("publications")
                .select("*")
                .where({ id: req.params.id });
            let likes = db("likes")
                .select("user_id")
                .where({ publication_id: req.params.id });
            let comments = db("comments")
                .select("user_id", "text")
                .where({ publication_id: req.params.id });
            return Promise.all([publication, likes, comments])
        })
        .then(result => {
            let publication = result[0][0]; //обратились к объекту, который находится в двумерном массиве
            publication.likes = result[1];
            publication.comments = result[2];
            res.send(publication);
        })
        .catch(error => {
            res.status(500).send(error);
        })
};

const destroy = function (req, res) {
    db("publications")
        .where({ id: req.params.id })
        .delete()
        .then(id => {
            res.send({
                message: "The publication has been deleted"
            })
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

module.exports = {
    index,
    indexFollowing,
    show,
    store,
    update,
    destroy
};
