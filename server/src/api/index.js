const Imgur = require("./services/imgur.js");
const Twitch = require("./services/twitch.js");
const Discord = require("./services/discord.js");
const Spotify = require("./services/spotify.js");
const Github = require("./services/github.js");
const Gmail = require("./services/gmail.js");
const Linkedin = require("./services/linkedin.js");

async function create() {
    await Imgur.create();
    await Twitch.create();
    await Discord.create();
    await Spotify.create();
    await Github.create();
    await Gmail.create();
    await Linkedin.create();

    await Imgur.createActions();
    await Twitch.createActions();
    await Discord.createActions();
    await Spotify.createActions();
    await Github.createActions();
    await Gmail.createActions();
    await Linkedin.createActions();

    await Imgur.createReactions();
    await Twitch.createReactions();
    await Discord.createReactions();
    await Spotify.createReactions();
    await Github.createReactions();
    await Gmail.createReactions();
    await Linkedin.createReactions();
}

module.exports.create = create;