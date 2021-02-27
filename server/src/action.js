const Imgur = require("./api/services/imgur.js")
const Twitch = require("./api/services/twitch.js")
const Discord = require("./api/services/discord.js")
const Github = require("./api/services/github.js")
const Gmail = require("./api/services/gmail.js")
const Spotify = require("./api/services/spotify.js")
const Linkedin = require("./api/services/linkedin.js")

var functionAction = {
    "new_like": Imgur.new_like,
    "new_post": Imgur.new_post,
    "new_pin": Discord.new_pin,
    "new_follower_twitch": Twitch.new_follower,
    "new_issue": Github.new_issue,
    "new_mail": Gmail.new_mail,
    "new_follower_spotify": Spotify.new_follower,
    "new_music": Spotify.new_music,
    "new_message": Linkedin.new_message
}

exports.checkAction = () => {
    functionAction["new_like"]()
}