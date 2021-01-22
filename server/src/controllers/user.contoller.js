const { exit } = require("process");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// register
exports.create = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!",
            success: false
        });
        return;
    }

    var exist = await User.findOne({ where: {username: req.body.username}});
    if (exist) {
        res.status(501).send({
            message: "Username already exist!",
            success: false
        });
        return;
    }

    exist = await User.findOne({ where: {email: req.body.email}});
    if (exist) {
        res.status(502).send({
            message: "Email already exist!",
            success: false
        });
        return;
    }

    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: false
    };

    User.create(user)
    .then(data => {
        res.status(200).send({
            username: data.username,
            email: data.email,
            is_admin: data.isAdmin,
            success: true
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user.",
            success: false
        });
    });
};

// login
exports.findbyId = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!",
            success: false
        });
        return;
    }

    var data = await User.findOne({ where: {username: req.body.username, password: req.body.password}});
    if (data) {
        res.status(200).send({
            username: data.username,
            email: data.email,
            is_admin: data.isAdmin,
            success: true
        });
    } else {
        res.status(503).send({
            message: "Username or password is not correct!",
            success: false
        });
    }
};
