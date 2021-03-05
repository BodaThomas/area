const db = require("../../models");
const axios = require("axios")
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New like Imgur"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 1,
        description: "Check if there is a new like in our last image",
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
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }});
    const token = tmp.accessToken;
    const nbrLikes = Number(element.lastResult)
    let count = 0;
    const res = await axios.get(`https://api.imgur.com/3/account/me/images`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    for (const elem of res.data.data) {
        const imageId = elem.id;
        const resData = await axios.get(`https://api.imgur.com/3/gallery/image/${imageId}/votes`,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const likes = resData.data.data.ups;
        count += likes;
    }
    if (nbrLikes != count) {
        element.lastResult = count;
        await element.save();
        if (nbrLikes < count) return true;
    }
    return false;
}
module.exports.run = run;