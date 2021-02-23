const db = require("../models");
const Service = db.services;

module.exports = async () => {
    const Imgur = {
        name: "Imgur",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://assets.stickpng.com/thumbs/5842a969a6515b1e0ad75b05.png",
        pColor: "#1bb76e",
        sColor: "#ffffff",
        OAuthUrl: "https://api.imgur.com/oauth2/authorize?client_id=5b23bbffd12751f&response_type=token"
    };
    await Service.create(Imgur);
    return Imgur;
}