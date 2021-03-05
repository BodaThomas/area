const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New subscription Youtube"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 7,
        description: "Check if user has subscribed to soemone",
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
    const nbrSubscription = Number(element.lastResult);
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
    const apiKey = process.env.CLIENTGMAIL;
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?mine=true&key=${apiKey}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }) || [];
    count = res.pageInfo.totalResults;
    if (nbrSubscription != count) {
        element.lastResult = count;
        await element.save();
        if (nbrSubscription < count) return true;
    }
    return false;
}
module.exports.run = run;