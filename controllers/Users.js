const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const index = function (req, res) {
    db("users")
        .select("id", "name", "photo")
        .where("name", "like", `%${req.query.search}%`)
        .then(users => {
            users.forEach(user => {
                user.photo = user.photo ? process.env.FULL_PATH + user.photo : process.env.FULL_PATH + "uploads/defaultPhoto.png";
            })
            res.send(users);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

const show = function (req, res) {
    db("users")
        .select("id", "name", "email", "photo", "about")
        .where({
            id: req.params.id
        })
        .then(user => {
            user[0].photo = user[0].photo ? process.env.FULL_PATH + user[0].photo : process.env.FULL_PATH + "uploads/defaultPhoto.png";
            res.send(user[0]);
        })
        .catch(error => {
            res.status(500).send(error);
        })
}

const showProfile = function (req, res) {
    if (+req.user.id === +req.params.id) {
        res.send(false);
    } else {
        let user = db("users")
            .select("id", "name", "email", "photo", "about")
            .where({
                id: req.params.id
            });
        let publications = db("publications")
            .select("id", "title", "description", "updated_at")
            .orderBy("updated_at", "desc")
            .where({
                user_id: req.params.id
            });
        let followers = db("followers")
            .select("*")
            .where({
                follower_id: req.params.id
            })
        let following = db("followers")
            .select("*")
            .where({
                user_id: req.params.id
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
                user.isFollowing = await db('followers')
                    .select('*')
                    .where({
                        user_id: req.user.id,
                        follower_id: req.params.id
                    })
                    .then(follower => follower.length ? true : false)
                user.publications = result[1];
                user.followers = result[2].length;
                user.following = result[3].length;
                res.send(user);
            })
            .catch(error => {
                res.status(500).send(error);
            });
    }
};

const update = function (req, res) {
    db("users")
        .where({
            id: req.params.id
        })
        .update({
            name: req.body.name,
            email: req.body.email
        })
        .then(id => {
            return db("users")
                .select("id", "name", "email")
                .where({
                    id: req.params.id
                });
        })
        .then(user => {
            res.send(user[0]);
        })
        .catch(error => {
            res.status(500).send(error);
        })
};

const updateRole = function (req, res) {
    db("users")
        .where({
            id: req.params.id
        })
        .update({
            role: req.body.role
        })
        .then(id => {
            return db("users")
                .select("id", "name", "email", "role")
                .where({
                    id: req.params.id
                });
        })
        .then(user => {
            res.send(user[0]);
        })
        .catch(error => {
            res.status(500).send(error);
        })
};

const updatePassword = async function (req, res) {
    db("users")
        .select("*")
        .where({
            id: req.params.id
        })
        .then(async user => {
            const validPass = await bcrypt.compare(req.body.current_password, user[0].password);
            if (!validPass) {
                return res.status(400).send({
                    message: "Invalid Password"
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            return db("users")
                .where({
                    id: user[0].id
                })
                .update({
                    password: hashedPassword
                })
        })
        .then(id => {
            return db("users")
                .select("*")
                .where({
                    id: req.params.id
                })
        })
        .then(user => {
            const token = jwt.sign({
                user: user[0]
            }, process.env.TOKEN_SECRET);
            return res.header("auth-token", token).send({
                message: "The password has been updated",
                _token: token
            });
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

const destroy = function (req, res) {
    db("users")
        .where({
            id: req.params.id
        })
        .delete()
        .then(id => {
            res.send({
                message: "The user has been deleted"
            })
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

module.exports = {
    index,
    show,
    showProfile,
    update,
    updateRole,
    updatePassword,
    destroy
}