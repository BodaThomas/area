const db = require("../../models");
const Service = db.services;
const newGuildDiscord = require("../actions/newguildDiscord.js");
const axios = require("axios")

async function create() {
    obj = await Service.findOne({ where: {name: "discord"}})
    const Discord = {
        name: "discord",
        actionsId: "",
        reactionId: "",
        urlLogo: "http://corntime.io/epitech/area/Discord-Logo-Color.png",
        pColor: "#7289DA",
        sColor: "#ffffff",
        OAuthUrl: "https://discord.com/api/oauth2/authorize?client_id=813397502262902794&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fdiscord&response_type=code&scope=identify%20email%20connections%20guilds%20guilds.join%20gdm.join"
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
}
module.exports.create = create;

async function createActions() {
    await newGuildDiscord.create();
}
module.exports.createActions = createActions;

async function createReactions() {
}
module.exports.createReactions = createReactions;

async function refreshToken(element)
{
    return res = axios.default.post("https://discordapp.com/api/oauth2/token",
    `client_id=${process.env.CLIENTDISCORD}&client_secret=${process.env.SECRETDISCORD}&grant_type=refresh_token&refresh_token=${element.refreshToken}&redirect_uri=http://localhost:8081/app/oauth/discord&scope=email+identify`,
    {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    )
    .then(async (res) => {
        element.accessToken = res.data.access_token
        element.refreshToken = res.data.refresh_token
        element.expires_at = Date.now() / 1000 + res.data.expires_in
        await element.save()
        return (res)
    }).catch((err) => {
        console.log(err.message)
        console.log(err)
    })
}
module.exports.refreshToken = refreshToken