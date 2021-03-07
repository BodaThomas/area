const { default: axios } = require("axios");
const db = require("../../models");
const Reaction = db.reactions
const Tokens = db.tokens

const nameReaction = "Pause a User's Playback"
const serviceId = 4

async function create()
{
    obj = await Reaction.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: serviceId,
        description: "Pause playback on the user’s account. (Spotify account premium required)",
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

async function run(element) {
    const area = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceId }});
    const token = area.accessToken;
    const res = await axios.put("https://api.spotify.com/v1/me/player/pause", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    })
}

module.exports.run = run;