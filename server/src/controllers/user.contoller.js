const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!",
            success: false
        });
        return;
    }
    var userAlready = await User.findOne({ where: {username: req.body.username}});
    console.log("User+ " +userAlready);
    if (userAlready) {
        res.status(501).send({
            message:  "Username already exist!",
            success: false
        });
        return;
    }
    userAlready = await User.findOne({ where: {email: req.body.email}});
    console.log("User+ " +userAlready);
    if (userAlready) {
        res.status(502).send({
            message:  "email already exist!",
            success: false
        });
        return;
    }
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isConnected: true
    };

    User.create(user)
    .then(data => {
        res.send({data, success:true});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user.",
            success: false
        });
    });
};