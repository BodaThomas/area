const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New follower Twitch"
const serviceID = 2

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
    let count = 0;
    let userId;
    let nbrFollowers = Number(element.lastResult);
    if (element.lastResult.length === 0) nbrFollowers = -1;
    const clientId = "bt90xzsoeiga923igrfds34xi9uspa";
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    const res = await axios.get(`https://api.twitch.tv/helix/users`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Client-Id': `${clientId}`
        } 
    }).then((res) => {
        userId = res.data.data[0].id;
        return res;
    }).catch((error) => {
        console.log(error.message)
    });
    const resData = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Client-Id': `${clientId}` 
        }
    }).then((resData) => {
        count = resData.data.total;
        return resData;
    }).catch((error) => {
        console.log(error.message)
    });
    if (nbrFollowers !== count) {
        element.lastResult = count;
        await element.save();
        if (nbrFollowers < count && nbrFollowers !== -1) {
            return true;
        }
    }
    return false;
}
module.exports.run = run;