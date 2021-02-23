const db = require("../models");
const Service = db.services;

module.exports = async () => {
    const Twitch = {
        name: "Twitch",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c540.png",
        pColor: "#1bb76e",
        sColor: "#ffffff",
        OAuthUrl: ""
    };
    await Service.create(Imgur);
    return Imgur;
}