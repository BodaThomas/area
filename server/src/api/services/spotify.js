const db = require("../../models");
const Service = db.services;
const newFollowerSpotify = require("../actions/newfollowerSpotify.js");
const newMusicSpotify = require("../actions/newmusicSpotify.js");
const pauseTrackSpotify = require("../reactions/pauseTrackSpotify")
const skipTrackSpotify = require("../reactions/skipTrackSpotify")
const startTrackSpotify = require("../reactions/startTrackSpotify")
const axios = require("axios")

async function create() {
    obj = await Service.findOne({ where: {name: "spotify"}})
    scope = "user-modify-playback-state user-library-read user-read-private user-read-email"
    const Spotify = {
        name: "spotify",
        actionsId: "",
        reactionId: "",
        urlLogo: "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-brands-logo-34.png",
        pColor: "#1ed760",
        sColor: "#ffffff",
        OAuthUrl: `https://accounts.spotify.com/authorize?response_type=code&client_id=fcd812ae0f364abea208d06cdb632e87&scope=` + encodeURIComponent(scope) + `&redirect_uri=http://localhost:8081/app/oauth/spotify`
    };
    if (!obj) {
        await Service.create(Spotify);
    }else {
        if (obj.name != Spotify.name) {
            obj.name = Spotify.name;
        }
        if (obj.actionsId != Spotify.actionsId) {
            obj.actionsId = Spotify.actionsId;
        }
        if (obj.reactionId != Spotify.reactionId) {
            obj.reactionId = Spotify.reactionId;
        }
        if (obj.urlLogo != Spotify.urlLogo) {
            obj.urlLogo = Spotify.urlLogo;
        }
        if (obj.pColor != Spotify.pColor) {
            obj.pColor = Spotify.pColor;
        }
        if (obj.sColor != Spotify.sColor) {
            obj.sColor = Spotify.sColor;
        }
        if (obj.OAuthUrl != Spotify.OAuthUrl) {
            obj.OAuthUrl = Spotify.OAuthUrl;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function createActions() {
    await newFollowerSpotify.create();
    await newMusicSpotify.create();
}
module.exports.createActions = createActions;

async function createReactions() {
    await pauseTrackSpotify.create()
    await skipTrackSpotify.create()
    await startTrackSpotify.create()
}
module.exports.createReactions = createReactions;

async function refreshToken(element)
{
    const res = axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            client_id: process.env.CLIENTSPOTIFY,
            client_secret: process.env.SECRETSPOTIFY,
            refresh_token: element.refreshToken,
            grant_type: 'refresh_token'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(async (res) => {
        element.accessToken = res.data.access_token
        element.expires_at = Date.now() / 1000 + Number(res.data.expires_in)
        await element.save()
        return res;
    }).catch((err) => {
        console.log(err)
        console.log(err.message)
    })
}
module.exports.refreshToken = refreshToken