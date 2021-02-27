const Imgur = require("./services/imgur.js")();
const Twitch = require("./services/twitch.js")();
const Discord = require("./services/discord.js")();
const Spotify = require("./services/spotify.js")();
const Github = require("./services/github.js")();
const Gmail = require("./services/gmail.js")();
const Linkedin = require("./services/linkedin.js")();

const newPinDiscord = require("./actions/newpinDiscord.js")();
const newLikeImgur = require("./actions/newlikeImgur.js")();
const newPostFromImgur = require("./actions/newpostfromImgur.js")();
const newFollowerTwitch = require("./actions/newfollowerTwitch.js")();
const newIssueGithub = require("./actions/newissueGithub.js")();
const newMailGmail = require("./actions/newmailGmail.js")();
const newFollowerSpotify = require("./actions/newfollowerSpotify.js")();
const newMusicSpotify = require("./actions/newmusicSpotify.js")();
const newMessageLinkedin = require("./actions/newmessageLinkedin.js")();

const api = {};
module.exports = api;

