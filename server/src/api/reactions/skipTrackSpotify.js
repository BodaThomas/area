const { default: axios } = require("axios");
const db = require("../../models");
const Reaction = db.reactions
const Tokens = db.tokens

const nameReaction = "Skip User’s Playback To Next Track"
const serviceId = 4

async function create()
{
    obj = await Reaction.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: serviceId,
        description: "Skips to next track in the user’s queue. (Spotify account premium required)",
        params: ""
    };
    if (!obj) {
        await Reaction.create(reaction); 
    }else {
        if (obj.name != reaction.name) {
            obj.name = reaction.name;
        }
        if (obj.serviceId != reaction.serviceId) {
            obj.serviceId = reaction.serviceId;
        }
        if (obj.description != reaction.description) {
            obj.description = reaction.description;
        }
        if (obj.params != reaction.params) {
            obj.params = reaction.params;
        }
        await obj.save();
    }
}

module.exports.create = create;

async function run(element)
{
    const area = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceId }});
    const token = area.accessToken;
    const res = await axios.post("https://api.spotify.com/v1/me/player/next", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    })
}

module.exports.run = run;