const db = require("../../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "imgur"}})
    const Imgur = {
        name: "imgur",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://miro.medium.com/max/392/1*6bqgBkbNo7kXLv2qXU6NHQ.jpeg",
        pColor: "#30da9c",
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