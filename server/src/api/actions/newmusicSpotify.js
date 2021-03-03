const db = require("../../models");
const axios = require("axios");
const { actions } = require("../../models");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New music Spotify"
const serviceId = 4;

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceId,
        description: "Check if the user saved a new track",
        params: ""
    };
    if (!obj) {
        await Actions.create(action); 
    }else {
        if (obj.name != action.name) {
            obj.name = action.name;
        }
        if (obj.serviceId != action.serviceId) {
            obj.serviceId = action.serviceId;
        }
        if (obj.description != action.description) {
            obj.description = action.description;
        }
        if (obj.params != action.params) {
            obj.params = action.params;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function run(element) {
    const elemToken = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceId }});
    const token = elemToken.accessToken
    var lastTotal = Number(element.lastResult);
    if (!lastTotal) lastTotal = 0
    const res = await axios.get(`https://api.spotify.com/v1/me/tracks`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (lastTotal != res.data.total) {
        element.lastResult = res.data.total;
        await element.save();
        if (res.data.total > lastTotal) return true;
    }
    return false;
}
module.exports.run = run;