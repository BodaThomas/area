const { exit } = require("process");
const db = require("../models");
const Tokens = db.tokens;
const Op = db.Sequelize.Op;

exports.addToken = async (req, res) => {
    if (!req.body.userId || !req.body.serviceId || !req.body.accessToken || !req.body.refreshToken) {
        res.status(400).json({
            message: "Content can't be empty.",
            success: false
        }).send();
        return;
    }

    const token = {
        userId: req.body.userId,
        serviceId : req.body.serviceId,
        accessToken: req.accessToken,
        refreshToken: req.body.refreshToken
    }

    await Tokens.create(token)
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the token.",
            success: false
        }).send();
    });
    res.status(200).json({
        success: true
    }).send();
}