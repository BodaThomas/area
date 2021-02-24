const db = require("../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "Twitch"}})
    const Twitch = {
        name: "Twitch",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c540.png",
        pColor: "#1bb76e",
        sColor: "#ffffff",
        OAuthUrl: ""
    };
    if (!obj) {
        await Service.create(Twitch);
    }else {
        if (obj.name != Twitch.name) {
            obj.name = Twitch.name;
        }
        if (obj.actionsId != Twitch.actionsId) {
            obj.actionsId = Twitch.actionsId;
        }
        if (obj.reactionId != Twitch.reactionId) {
            obj.reactionId = Twitch.reactionId;
        }
        if (obj.urlLogo != Twitch.urlLogo) {
            obj.urlLogo = Twitch.urlLogo;
        }
        if (obj.pColor != Twitch.pColor) {
            obj.pColor = Twitch.pColor;
        }
        if (obj.sColor != Twitch.sColor) {
            obj.sColor = Twitch.sColor;
        }
        if (obj.OAuthUrl != Twitch.OAuthUrl) {
            obj.OAuthUrl = Twitch.OAuthUrl;
        }
        await obj.save();
    }
    return Twitch;
}