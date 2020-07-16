const db = require("../database");

const index = function (req, res) {
    db('followers')
        .innerJoin('users', 'followers.user_id', 'users.id')
        .select('users.id', 'users.name', 'users.photo')
        .where({ follower_id: req.user.id })
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
        .innerJoin('users', 'followers.user_id', 'users.id')
        .select('users.id', 'users.name', 'users.photo')
        .where({ follower_id: req.params.id })
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

module.exports = {
    index,
    indexUser
}