const db = require("../../models");
const Service = db.services;
const newMessageLinkedin = require("../actions/newmessageLinkedin.js");

async function create() {
    obj = await Service.findOne({ where: {name: "linkedin"}})
    const Linkedin = {
        name: "linkedin",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://corntime.io/epitech/area/LI-In-Bug.png",
        pColor: "#0077b7",
        sColor: "#ffffff",
        OAuthUrl: "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77wl8zl7gsmo2y&scope=r_liteprofile&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Flinkedin"
    };
    if (!obj) {
        await Service.create(Linkedin); 
    }else {
        if (obj.name != Linkedin.name) {
            obj.name = Linkedin.name;
        }
        if (obj.actionsId != Linkedin.actionsId) {
            obj.actionsId = Linkedin.actionsId;
        }
        if (obj.reactionId != Linkedin.reactionId) {
            obj.reactionId = Linkedin.reactionId;
        }
        if (obj.urlLogo != Linkedin.urlLogo) {
            obj.urlLogo = Linkedin.urlLogo;
        }
        if (obj.pColor != Linkedin.pColor) {
            obj.pColor = Linkedin.pColor;
        }
        if (obj.sColor != Linkedin.sColor) {
            obj.sColor = Linkedin.sColor;
        }
        if (obj.OAuthUrl != Linkedin.OAuthUrl) {
            obj.OAuthUrl = Linkedin.OAuthUrl;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function createActions() {
    await newMessageLinkedin.create();
}
module.exports.createActions = createActions;

async function createReactions() {
}
module.exports.createReactions = createReactions;