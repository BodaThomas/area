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
const newSubscriberYoutube = require('./api/actions/newsubscriberYoutube');
const newSubscriptionYoutube = require('./api/actions/newsubscriptionYoutube');

//REACTIONS
const addCommentImgur = require("./api/reactions/addCommentImgur")
const addLikeImgur = require("./api/reactions/addLikeImgur")
const createissueGithub = require("./api/reactions/createissueGithub")
const createrepoGithub = require("./api/reactions/createrepoGithub")
const pauseTrackSpotify = require("./api/reactions/pauseTrackSpotify")
const sendMailGmail = require("./api/reactions/sendMailGmail")
const skipTrackSpotify = require("./api/reactions/skipTrackSpotify")
const startTrackSpotify = require("./api/reactions/startTrackSpotify")

var functionAction = {
    "New like Imgur": newLikeImgur.run,
    "New post Imgur": newPostImgur.run,
    "New guild Discord": newGuildDiscord.run,
    "New follower Twitch": newFollowerTwitch.run,
    "New issue Github": newIssueGithub.run,
    "New mail Gmail": newMailGmail.run,
    "New follower Spotify": newFollowerSpotify.run,
    "New music Spotify": newMusicSpotify.run,
    "New subscriber Youtube": newSubscriberYoutube.run,
    "New subscription Youtube": newSubscriptionYoutube.run
}

var functionReaction = {
    "Add comment Imgur": addCommentImgur.run,
    "Add like Imgur": addLikeImgur.run,
    "Create issue Github": createissueGithub.run,
    "Create repo Github": createrepoGithub.run,
    "Pause a User's Playback": pauseTrackSpotify.run,
    "Send mail Gmail": sendMailGmail.run,
    "Skip User’s Playback To Next Track": skipTrackSpotify.run,
    "Start/Resume a User's Playback": startTrackSpotify.run,
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