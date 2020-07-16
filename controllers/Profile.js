const db = require("../database");
const fs = require("fs"); //работа с файл

const show = function (req, res) {
    let user = db("users")
        .select("id", "name", "email", "photo", "about")
        .where({
            id: req.user.id
        });
    let publications = db("publications")
        .select("id", "title", "description", "updated_at")
        .orderBy("updated_at", "desc")
        .where({
            user_id: req.user.id
        });
    let followers = db("followers")
        .select("*")
        .where({
            follower_id: req.user.id
        })
    let following = db("followers")
        .select("*")
        .where({
            user_id: req.user.id
        })
    Promise.all([user, publications, followers, following])
        .then(async result => {
            let user = result[0][0];
            user.photo = user.photo ? process.env.FULL_PATH + user.photo : process.env.FULL_PATH + "uploads/defaultPhoto.png";
            for (let i = 0; i < result[1].length; i++) {
                result[1][i].likes = await db("likes")
                    .select("user_id")
                    .where({ publication_id: result[1][i].id })
                    .then(likes => {
                        likes.forEach(like => {
                            if (like.user_id === req.user.id) {
                                result[1][i].isLike = true;
                            }
                        })
                        return likes;
                    })
                    .catch(error => {
                        res.status(500).send(error);
                    });
                result[1][i].comments = await db("comments")
                    .select("id", "user_id", "publication_id", "text", "created_at")
                    .where({ publication_id: result[1][i].id })
                    .orderBy("created_at", "desc")
                    .then(comments => comments)
                    .catch(error => {
                        res.status(500).send(error);
                    });
            }
            user.publications = result[1];
            user.followers = result[2].length;
            user.following = result[3].length;
            res.send(user);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

const storePhoto = function (req, res) {
    db("users")
        .where({
            id: req.user.id
        })
        .update({
            photo: req.file.path
        })
        .then(id => {
            return db("users")
                .select("photo")
                .where({
                    id: req.user.id
                });
        })
        .then(user => {
            res.send({
                photo: process.env.FULL_PATH + user[0].photo
            });
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

const updateAbout = function (req, res) {
    db("users")
        .where({
            id: req.user.id
        })
        .update({
            about: req.body.about
        })
        .then(amount => {
            return db("users")
                .select("about")
                .where({
                    id: req.user.id
                })
        })
        .then(user => {
            res.send({
                about: user[0].about
            })
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

const destroyPhoto = function (req, res) {
    db("users")
        .select("*")
        .where({
            id: req.user.id
        })
        .then(user => {
            fs.unlinkSync(user[0].photo);
            return db("users").where({
                id: req.user.id
            }).update({
                photo: null
            });
        })
        .then(amount => {
            return db("users").select("photo").where({
                id: req.user.id
            });
        })
        .then(user => {
            res.send({
                photo: process.env.FULL_PATH + "uploads/defaultPhoto.png"
            });
        })
        .catch(error => {
            res.status(500).send(error);
        })
}


module.exports = {
    show,
    storePhoto,
    updateAbout,
    destroyPhoto
}