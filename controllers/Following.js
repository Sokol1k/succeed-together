const db = require("../database");
const { where } = require("../database");

const index = function (req, res) {
    db('followers')
        .innerJoin('users', 'followers.follower_id', 'users.id')
        .select('users.id', 'users.name', 'users.photo')
        .where({ user_id: req.user.id })
        .then(followers => {
            followers.map(follower => {
                follower.photo = follower.photo ? process.env.FULL_PATH + follower.photo : process.env.FULL_PATH + "uploads/defaultPhoto.png";
            })
            res.send(followers);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

const indexUser = function (req, res) {
    db('followers')
        .innerJoin('users', 'followers.follower_id', 'users.id')
        .select('users.id', 'users.name', 'users.photo')
        .where({ user_id: req.params.id })
        .then(followers => {
            followers.map(follower => {
                follower.photo = follower.photo ? process.env.FULL_PATH + follower.photo : process.env.FULL_PATH + "uploads/defaultPhoto.png";
            })
            res.send(followers);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

const follow = function (req, res) {
    db('followers')
        .select('*')
        .where({
            user_id: req.user.id,
            follower_id: req.params.id
        })
        .then(follower => {
            if (follower.length) {
                let destroy = db('followers')
                    .where({id: follower[0].id})
                    .delete();
                let message = 'The following has been deleted';
                return Promise.all([destroy, message]);
            } else {
                let data = {
                    user_id: req.user.id,
                    follower_id: req.params.id
                }
                let create = db('followers').insert(data);
                let message = 'The following has been created';
                return Promise.all([create, message]);
            }
        })
        .then(result => {
            res.send({ message: result[1] });
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

module.exports = {
    index,
    indexUser,
    follow
}