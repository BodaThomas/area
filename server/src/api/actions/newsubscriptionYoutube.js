const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New subscription Youtube"
const serviceId = 7

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceId,
        description: "Check if user has subscribed to someone",
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
    let nbrSubscription = Number(element.lastResult);
    if (element.lastResult.length === 0) nbrSubscription = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceId }});
    const token = tmp.accessToken;
    const apiKey = process.env.CLIENTGMAIL;
    console.log('run newsubscriptionYoutube action')
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?mine=true&key=${apiKey}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        count = res.data.pageInfo.totalResults;
        return res;
    }).catch((error) => {
        console.log('newsubscriptionYoutube action:', error.message)
    });
    if (nbrSubscription != count) {
        element.lastResult = count;
        await element.save();
        if (nbrSubscription < count && nbrSubscription !== -1)
            return true;
    }
    return false;
}
module.exports.run = run;