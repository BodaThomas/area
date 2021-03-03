const db = require("../../models");
const Actions = db.actions;

const nameAction = "New follower Twitch"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 2,
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
    const nbrFollowers = Number(element.lastResult);
    const clientId = "bt90xzsoeiga923igrfds34xi9uspa";
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
    const res = await axios.get(`https://api.twitch.tv/helix/users`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Client-Id': `${clientId}` 
        } 
    }).catch((error) => {
        console.log(error.message)
    }) || [];
    userId = res.data.data[0].id;
    const resData = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Client-Id': `${clientId}` 
        }
    }).catch((error) => {
        console.log(error.message)
    }) || [];
    count = resData.data.total;
    if (nbrFollowers != count) {
        element.lastResult = count;
        await element.save();
        if (nbrFollowers < count)
            return true;
    }
    return false;
}
module.exports.run = run;