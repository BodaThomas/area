const db = require("../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "github"}})
    const Github = {
        name: "github",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png",
        pColor: "#000000",
        sColor: "#ffffff",
        OAuthUrl: "https://github.com/login/oauth/authorize?client_id=90d45db59b92aa76bd6d"
    };
    if (!obj) {
        await Service.create(Github); 
    }else {
        if (obj.name != Github.name) {
            obj.name = Github.name;
        }
        if (obj.actionsId != Github.actionsId) {
            obj.actionsId = Github.actionsId;
        }
        if (obj.reactionId != Github.reactionId) {
            obj.reactionId = Github.reactionId;
        }
        if (obj.urlLogo != Github.urlLogo) {
            obj.urlLogo = Github.urlLogo;
        }
        if (obj.pColor != Github.pColor) {
            obj.pColor = Github.pColor;
        }
        if (obj.sColor != Github.sColor) {
            obj.sColor = Github.sColor;
        }
        if (obj.OAuthUrl != Github.OAuthUrl) {
            obj.OAuthUrl = Github.OAuthUrl;
        }
        await obj.save();
    }
    return Github;
}