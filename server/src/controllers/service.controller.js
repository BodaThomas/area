const { Server } = require("http");
const { exit } = require("process");
const { user } = require("../models");
const db = require("../models");
const Services = db.services;
const Op = db.Sequelize.Op;
const Actions = db.actions;
const Reactions = db.reactions
const User = db.user;

exports.getServices = async (req, res) => {
    let isMobile = false;
    if (req.query.isMobile) {
        if (req.query.isMobile == "true") isMobile = true;
    }
    const services = await Services.findAll();
    var data = [];
    if (services) {
        (services).forEach(element => {
            const json = {
                id: element.id,
                name: element.name,
                logo: element.urlLogo,
                primaryColor: element.pColor,
                secondaryColor: element.sColor,
                OAuthUrl: element.OAuthUrl
            };
            if (!isMobile && json.name === "imgurMobile") continue;
            data.push(json)
        })
        res.status(200).json({
            services: data,
            success: true
        }).send();
    }else {
        res.status(500).json({
            message: "An internal error occurred",
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

exports.getReactions = async (req, res) => {
    if (!req.query.accessToken) {
        res.status(401).json({
            message: "You must be connected.",
            success: false
        }).send()
        return;
    }
    const user = await User.findOne({where: {accessToken: req.query.accessToken}})
    if (!user) {
        res.status(401).json({
            message: "You must be connected.",
            success: false
        }).send()
        return;
    }
    const reactions = await Reactions.findAll();
    var data = []
    if (reactions) {
        for (element of reactions) {
            const service = await Services.findOne({where: {id: element.serviceId}})
            const json = {
                id: element.id,
                service: {
                    id: service.id,
                    name: service.name,
                    pColor: service.pColor,
                    sColor: service.sColor,
                    urlLogo: service.urlLogo
                },
                name: element.name,
                description: element.description,
                params: element.params
            }
            data.push(json);
        }
    }
    res.status(200).json({
        data: data,
        success: true
    }).send()
}

exports.getActions = async (req, res) => {
    if (!req.query.accessToken) {
        res.status(401).json({
            message: "You must be connected.",
            success: false
        }).send()
        return;
    }
    const user = await User.findOne({where: {accessToken: req.query.accessToken}})
    if (!user) {
        res.status(401).json({
            message: "You must be connected.",
            success: false
        }).send()
        return;
    }
    const actions = await Actions.findAll();
    var data = []
    if (actions) {
        for (element of actions) {
            const service = await Services.findOne({where: {id: element.serviceId}})
            const json = {
                id: element.id,
                service: {
                    id: service.id,
                    name: service.name,
                    pColor: service.pColor,
                    sColor: service.sColor,
                    urlLogo: service.urlLogo
                },
                name: element.name,
                description: element.description,
                params: element.params
            }
            data.push(json)
        }
    }
    res.status(200).json({
        data: data,
        success: true
    }).send()
}