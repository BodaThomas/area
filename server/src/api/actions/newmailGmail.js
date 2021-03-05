const db = require("../../models");
const { default: axios } = require("axios");
const Actions = db.actions;
const Tokens = db.tokens;

const nameAction = "New mail Gmail"
const serviceID = 6

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: serviceID,
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
    let nbrMails = Number(element.lastResult);
    if (!nbrMails) nbrMails = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
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
        if (nbrMails < count && nbrMails !== -1)
            return true;
    }
    return false;
}
module.exports.run = run;