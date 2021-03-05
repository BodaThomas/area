const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New mail Gmail"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 6,
        description: "Check if user has a new email",
        params: "receiverMail"
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
    const nbrMails = Number(element.lastResult);
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }});
    const token = tmp.accessToken;
    const apiKey = process.env.CLIENTGMAIL;
    const res = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/profile?key=${apiKey}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch(error => {
        console.log(error.message);
    });
    count = res.data.messagesTotal;
    if (count && count != nbrMails) {
        element.lastResult = count;
        await area.save();
        if (nbrMails < count) {
            return true;
        }
    }
    return false;
}
module.exports.run = run;