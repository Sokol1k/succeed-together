const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async function (req, res) {
    db("users")
        .select("*")
        .where({
            email: req.body.email
        })
        .then(user => {
            if (user.length) {
                return res.status(403).send({
                    email: "This email is not free!"
                });
            }
            return db("users")
                .select("*")
                .where({
                    name: req.body.name
                });
        })
        .then(async user => {
            if (user.length) {
                res.status(403).send({
                    name: "This name is not free!"
                });
            }
            //hash passwords
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            //Create a new user
            const data = {
                name: req.body.name,
                email: req.body.email,
                role: "user",
                password: hashedPassword
            };
            return db("users").insert(data);
        })
        .then(() => {
            res.status(201).send({
                message: "User has been registered"
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const login = async function (req, res) {
    db("users")
        .select("*")
        .where({
            email: req.body.email
        })
        .then(async user => {
            if (!user.length) {
                return res.status(403).send({
                    message: "Email is not found!"
                });
            }

            //password is correct
            const validPass = await bcrypt.compare(req.body.password, user[0].password);
            if (!validPass) {
                return res.status(400).send({
                    message: "Invalid Password"
                });
            }

            //create and assign a token
            const token = jwt.sign({
                user: user[0]
            }, process.env.TOKEN_SECRET);
            return res.header("auth-token", token).send({
                _token: token
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

module.exports = {
    register,
    login
};