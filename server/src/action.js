const db = require("./models");
const Areas = db.area
const Actions = db.actions
const newLikeImgur = require("./api/actions/newlikeImgur")
const newPostImgur = require("./api/actions/newpostfromImgur")
const newFollowerSpotify = require("./api/actions/newfollowerSpotify")
const newGuildDiscord = require('./api/actions/newguildDiscord')
const newMailGmail = require('./api/actions/newmailGmail')
const newFollowerTwitch = require('./api/actions/newfollowerTwitch')
const newIssueGithub = require('./api/actions/newissueGithub')

const Spotify = require("./api/services/spotify.js")
const Linkedin = require("./api/services/linkedin.js");

var functionAction = {
    "New like Imgur": newLikeImgur.run,
    "New post Imgur": newPostImgur.run,
    "New guild Discord": newGuildDiscord.run,
    "New follower Twitch": newFollowerTwitch.run,
    "New issue Github": newIssueGithub.run,
    "New mail Gmail": newMailGmail.run,
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