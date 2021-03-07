const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New post Imgur"
const serviceID = 1

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceID,
        description: "Check if a user has posted something new",
        params: "Username"
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
    let nbrPosts = Number(element.lastResult);
    if (element.lastResult.length === 0) nbrPosts = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    const res = await axios.get(`https://api.imgur.com/3/account/me/images/count`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    count = res.data.data;
    if (nbrPosts != count) {
        element.lastResult = count;
        await element.save();
        if (nbrPosts < count && nbrPosts !== -1)
            return true;
    }
    return false;
}
module.exports.run = run;