const db = require("./models");
const Areas = db.area
const Actions = db.actions
const newLikeImgur = require("./api/actions/newLikeImgur.js")
const newPostImgur = require("./api/actions/newpostfromImgur")
const newFollowerSpotify = require("./api/actions/newfollowerSpotify")
const Twitch = require("./api/services/twitch.js")
const Discord = require("./api/services/discord.js")
const Github = require("./api/services/github.js")
const Gmail = require("./api/services/gmail.js")
const Spotify = require("./api/services/spotify.js")
const Linkedin = require("./api/services/linkedin.js");

var functionAction = {
    "New like Imgur": newLikeImgur.run,
    "New post Imgur": newPostImgur.run,
    "New pin Discord": Discord.new_pin,
    "New follower Twitch": Twitch.new_follower,
    "New issue Github": Github.new_issue,
    "New mail Gmail": Gmail.new_mail,
    "New follower Spotify": newFollowerSpotify.run,
    "New music Spotify": Spotify.newMusicSpotifyRun,
    "New message Linkedin": Linkedin.new_message
}

async function checkAction() {
    const areas = await Areas.findAll();
    if (areas) {
        for (element of areas) {
            const action = await Actions.findOne({where: { id: element.actionId }});
            console.log(action.name)
            if (await functionAction[action.name](element)) {
                console.log("REACTION")
            }
        }
    }
} 

module.exports.checkAction = checkAction