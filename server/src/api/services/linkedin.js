const db = require("../../models");
const Service = db.services;

module.exports = async () => {
    obj = await Service.findOne({ where: {name: "linkedin"}})
    const Linkedin = {
        name: "linkedin",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://image.flaticon.com/icons/png/512/174/174857.png",
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
    return Linkedin;
}