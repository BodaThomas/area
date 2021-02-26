const db = require("../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "twitch"}})
    const Twitch = {
        name: "twitch",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c540.png",
        pColor: "#6441a5",
        sColor: "#ffffff",
        OAuthUrl: "https://id.twitch.tv/oauth2/authorize?client_id=bt90xzsoeiga923igrfds34xi9uspa&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Ftwitch&response_type=token&scope=user:edit+user:read:email+bits:read+channel_read"
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