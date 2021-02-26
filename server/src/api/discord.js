const db = require("../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "discord"}})
    const Discord = {
        name: "discord",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png",
        pColor: "#8a9cfe",
        sColor: "#ffffff",
        OAuthUrl: "https://discord.com/api/oauth2/authorize?client_id=813397502262902794&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fdiscord&response_type=code&scope=identify%20email%20connections%20relationships.read"
    };
    if (!obj) {
        await Service.create(Discord); 
    }else {
        if (obj.name != Discord.name) {
            obj.name = Discord.name;
        }
        if (obj.actionsId != Discord.actionsId) {
            obj.actionsId = Discord.actionsId;
        }
        if (obj.reactionId != Discord.reactionId) {
            obj.reactionId = Discord.reactionId;
        }
        if (obj.urlLogo != Discord.urlLogo) {
            obj.urlLogo = Discord.urlLogo;
        }
        if (obj.pColor != Discord.pColor) {
            obj.pColor = Discord.pColor;
        }
        if (obj.sColor != Discord.sColor) {
            obj.sColor = Discord.sColor;
        }
        if (obj.OAuthUrl != Discord.OAuthUrl) {
            obj.OAuthUrl = Discord.OAuthUrl;
        }
        await obj.save();
    }
    return Discord;
}