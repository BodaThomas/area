const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New guild Discord"
const serviceID = 3

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceID,
        description: "Check if there is a new guild",
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
    let nbrGuilds = Number(element.lastResult);
    if (typeof element.lastResult === 'undefined' || element.lastResult === "") nbrGuilds = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    let count = 0;
    const res = await axios.get(`https://discordapp.com/api/users/@me/guilds`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        count = res.data.length;
        return res
    })
    .catch((error) => {
        console.log(error.message)
    });
    if (nbrGuilds != count) {
        element.lastResult = count;
        await element.save();
        if (nbrGuilds < count && nbrGuilds !== -1) {
            return true;
        }
    }
    return false;
}
module.exports.run = run;