const { Server } = require("http");
const { exit } = require("process");
const db = require("../models");
const Services = db.services;
const Op = db.Sequelize.Op;


exports.getServices = async (req, res) => {
    const services = await Services.findAll();
    var response = [];
    if (services) {
        (services).forEach(element => {
            const json = {
                name: element.name,
                logo: element.urlLogo,
                primaryColor: element.pColor,
                secondaryColor: element.sColor,
                OAuthUrl: element.OAuthUrl
            };
            response.push(json)
        })
        console.log(response)
        res.status(200).json({
            Services: response,
            success: true
        }).send();
    }else {
        res.status(500).json({
            message: "A internale error is occcured.",
            succes: false
        }).send()
    }
}

exports.getToken = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            message: "Content can't be empty.",
            success: false
        }).send();
        return;
    }
    var data = await Services.findOne({ where: {name: req.body.name}});
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

exports.connect = async (req, res) => {
    var data = await Services.findAll();
    if (data) {
        var tabName = [];
        var tabLink = [];
        (data).forEach(element => {
            tabName.push(element.name);
            tabLink.push(element.OAuthUrl);
        });
        res.status(200).json({
            names: tabName,
            links: tabLink,
            success: true
        }).send();
    }else {
        res.status(401).json({
            message: "Service not found",
            success: false
        }).send();
    }
}