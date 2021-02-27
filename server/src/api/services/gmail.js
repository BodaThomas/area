const db = require("../../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "gmail"}})
    const Gmail = {
        name: "gmail",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://1000logos.net/wp-content/uploads/2018/05/Gmail-logo.png",
        pColor: "#eb4336",
        sColor: "#ffffff",
        OAuthUrl: "https://accounts.google.com/o/oauth2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fgmail&response_type=code&client_id=1075659410846-p4qihf6j87volbo54bsam5frqemvem1r.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2F&approval_prompt=force"
    };
    if (!obj) {
        await Service.create(Gmail); 
    }else {
        if (obj.name != Gmail.name) {
            obj.name = Gmail.name;
        }
        if (obj.actionsId != Gmail.actionsId) {
            obj.actionsId = Gmail.actionsId;
        }
        if (obj.reactionId != Gmail.reactionId) {
            obj.reactionId = Gmail.reactionId;
        }
        if (obj.urlLogo != Gmail.urlLogo) {
            obj.urlLogo = Gmail.urlLogo;
        }
        if (obj.pColor != Gmail.pColor) {
            obj.pColor = Gmail.pColor;
        }
        if (obj.sColor != Gmail.sColor) {
            obj.sColor = Gmail.sColor;
        }
        if (obj.OAuthUrl != Gmail.OAuthUrl) {
            obj.OAuthUrl = Gmail.OAuthUrl;
        }
        await obj.save();
    }
    return Gmail;
}