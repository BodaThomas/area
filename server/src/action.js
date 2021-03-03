const db = require("./models");
const Areas = db.area
const Actions = db.actions
const Reactions = db.reactions

//ACTIONS
const newLikeImgur = require("./api/actions/newlikeImgur")
const newPostImgur = require("./api/actions/newpostfromImgur")
const newFollowerSpotify = require("./api/actions/newfollowerSpotify")
const newMusicSpotify = require("./api/actions/newmusicSpotify")
const newGuildDiscord = require('./api/actions/newguildDiscord')
const newMailGmail = require('./api/actions/newmailGmail')
const newFollowerTwitch = require('./api/actions/newfollowerTwitch')
const newIssueGithub = require('./api/actions/newissueGithub')

//REACTIONS
const pauseTrackSpotify = require("./api/reactions/pauseTrackSpotify")
const skipTrackSpotify = require("./api/reactions/skipTrackSpotify")
const startTrackSpotify = require("./api/reactions/startTrackSpotify")


const Linkedin = require("./api/services/linkedin.js");

var functionAction = {
    "New like Imgur": newLikeImgur.run,
    "New post Imgur": newPostImgur.run,
    "New guild Discord": newGuildDiscord.run,
    "New follower Twitch": newFollowerTwitch.run,
    "New issue Github": newIssueGithub.run,
    "New mail Gmail": newMailGmail.run,
    "New follower Spotify": newFollowerSpotify.run,
    "New music Spotify": newMusicSpotify.run,
    "New message Linkedin": Linkedin.new_message
}

var functionReaction = {
    "Pause a User's Playback": pauseTrackSpotify.run,
    "Skip User’s Playback To Next Track": skipTrackSpotify.run,
    "Start/Resume a User's Playback": startTrackSpotify.run
}

async function checkAction() {
    const areas = await Areas.findAll();
    if (areas) {
        for (element of areas) {
            const action = await Actions.findOne({where: { id: element.actionId }});
            if (await functionAction[action.name](element)) {
                const reaction = await Reactions.findOne({where : {id: element.reactionId}})
                functionReaction[reaction.name](element)         
            }
        }
    }
} 

module.exports.checkAction = checkAction