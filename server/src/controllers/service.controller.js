const { exit } = require("process");
const db = require("../models");
const Service = db.services;
const Op = db.Sequelize.Op;

exports.getToken = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            message: "Content can't be empty.",
            success: false
        }).send();
        return;
    }
    var data = await Service.findOne({ where: {name: req.body.name}});
    if (data) {
        res.status(200).json({
            token: data.clientToken,
            success: true
        }).send();
        return;
    }else {
        res.status(401).json({
            message: "Service not found",
            success: false
        }).send();
        return;
    }
}