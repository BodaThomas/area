const db = require("../../models");
const Actions = db.actions;

const nameAction = "New post Imgur"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 1,
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
    const nbrPosts = Number(element.lastResult);
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
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
        if (nbrPosts < count)
            return true;
    }
    return false;
}
module.exports.run = run;