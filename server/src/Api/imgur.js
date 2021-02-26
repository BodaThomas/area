const db = require("../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "Imgur"}})
    const Imgur = {
        name: "Imgur",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://assets.stickpng.com/thumbs/5842a969a6515b1e0ad75b05.png",
        pColor: "#1bb76e",
        sColor: "#ffffff",
        OAuthUrl: "https://api.imgur.com/oauth2/authorize?client_id=5b23bbffd12751f&response_type=token"
    };
    if (!obj) {
        await Service.create(Imgur); 
    }else {
        if (obj.name != Imgur.name) {
            obj.name = Imgur.name;
        }
        if (obj.actionsId != Imgur.actionsId) {
            obj.actionsId = Imgur.actionsId;
        }
        if (obj.reactionId != Imgur.reactionId) {
            obj.reactionId = Imgur.reactionId;
        }
        if (obj.urlLogo != Imgur.urlLogo) {
            obj.urlLogo = Imgur.urlLogo;
        }
        if (obj.pColor != Imgur.pColor) {
            obj.pColor = Imgur.pColor;
        }
        if (obj.sColor != Imgur.sColor) {
            obj.sColor = Imgur.sColor;
        }
        if (obj.OAuthUrl != Imgur.OAuthUrl) {
            obj.OAuthUrl = Imgur.OAuthUrl;
        }
        await obj.save();
    }
    return Imgur;
}

async function new_like () {
}

module.exports.new_like = new_like;