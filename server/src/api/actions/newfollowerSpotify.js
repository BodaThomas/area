const { default: axios } = require("axios");
const db = require("../../models");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New follower Spotify"
const serviceID = 4

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceID,
        description: "Check if there is a new follower",
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
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    let lastFollowers = Number(element.lastResult);
    if (typeof element.lastResult === 'undefined' || element.lastResult === "") lastFollowers = -1;
    let count = 0;
    const res = await axios.get('https://api.spotify.com/v1/me',
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    count = res.data.followers.total;
    if (count && lastFollowers != count) {
        element.lastResult = count;
        await element.save();
        if (lastFollowers < count && lastFollowers !== -1) {
            return true;
        }
    }
    return false;
}
module.exports.run = run;