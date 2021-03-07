const db = require("./models")
const Tokens = db.tokens;

//SERVICE
const Imgur = require("./api/services/imgur")
const Twitch = require("./api/services/twitch")
const Discord = require("./api/services/discord")
const Spotify = require("./api/services/spotify")
const Github = require("./api/services/github")
const Gmail = require("./api/services/gmail")
const Youtube = require("./api/services/youtube")

var functionRefresh = {
    1: Imgur.refreshToken,
    2: Twitch.refreshToken,
    3: Discord.refreshToken,
    4: Spotify.refreshToken,
    5: Github.refreshToken,
    6: Gmail.refreshToken,
    7: Youtube.refreshToken
}

async function checkToken()
{
    tokens = await Tokens.findAll();
    for (element of tokens) {
        const date = Date.now() / 1000;
        if (element.expires_at - date < 10 && (element.serviceId != 5)) {
            functionRefresh[element.serviceId](element)
        }
    }
}

module.exports.checkToken = checkToken