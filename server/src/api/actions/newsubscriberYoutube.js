const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New subscriber Youtube"
const serviceID = 7

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceID,
        description: "Check if user has a new subscriber",
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
    let nbrSubscribers = Number(element.lastResult);
    if (!nbrSubscribers) nbrSubscribers = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    const apiKey = process.env.CLIENTGMAIL;
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?mySubscribers=true&key=${apiKey}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }) || [];
    count = res.data.pageInfo.totalResults;
    if (nbrSubscribers != count) {
        element.lastResult = count;
        await element.save();
        if (nbrSubscribers < count && nbrSubscribers != -1)
            return true;
    }
    return false;
}
module.exports.run = run;