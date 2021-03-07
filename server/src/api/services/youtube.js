const db = require("../../models");
const Service = db.services;
const newSubscriberYoutube = require("../actions/newsubscriberYoutube");
const newSubscriptionYoutube = require("../actions/newsubscriptionYoutube");
const axios = require("axios")

async function create() {
    obj = await Service.findOne({ where: {name: "youtube"}})
    const Youtube = {
        name: "youtube",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://corntime.io/epitech/area/yt_icon_rgb.png",
        pColor: "#FF0000",
        sColor: "#ffffff",
        OAuthUrl: "https://accounts.google.com/o/oauth2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fyoutube&response_type=code&client_id=1075659410846-p4qihf6j87volbo54bsam5frqemvem1r.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl&access_type=offline&prompt=consent"
    };
    if (!obj) {
        await Service.create(Youtube); 
    }else {
        if (obj.name != Youtube.name) {
            obj.name = Youtube.name;
        }
        if (obj.actionsId != Youtube.actionsId) {
            obj.actionsId = Youtube.actionsId;
        }
        if (obj.reactionId != Youtube.reactionId) {
            obj.reactionId = Youtube.reactionId;
        }
        if (obj.urlLogo != Youtube.urlLogo) {
            obj.urlLogo = Youtube.urlLogo;
        }
        if (obj.pColor != Youtube.pColor) {
            obj.pColor = Youtube.pColor;
        }
        if (obj.sColor != Youtube.sColor) {
            obj.sColor = Youtube.sColor;
        }
        if (obj.OAuthUrl != Youtube.OAuthUrl) {
            obj.OAuthUrl = Youtube.OAuthUrl;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function createActions() {
    await newSubscriberYoutube.create();
    await newSubscriptionYoutube.create();
}
module.exports.createActions = createActions;

async function createReactions() {
}
module.exports.createReactions = createReactions;

async function refreshToken(element)
{
    const res = axios.default.post("https://accounts.google.com/o/oauth2/token",
    `refresh_token=${element.refreshToken}&client_id=${process.env.CLIENTGMAIL}&client_secret=${process.env.SECRETGMAIL}&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fyoutube&grant_type=refresh_token`,
    {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(async (res) => {
        element.accessToken = res.data.access_token;
        element.expires_at = (Date.now() / 1000) + res.data.expires_in
        await element.save()
        return (res);
    }).catch(error => {
        console.log(error);
    });
    return res;
}
module.exports.refreshToken = refreshToken