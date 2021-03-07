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
    let nbrMails = Number(element.lastResult);
    if (element.lastResult.length === 0) nbrMails = -1;
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceID }});
    const token = tmp.accessToken;
    const apiKey = process.env.CLIENTGMAIL;
    const res = await axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages?q=in:inbox&key=${apiKey}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        count = res.data.resultSizeEstimate;
        return res;
    }).catch(error => {
        console.log(error.message);
    });
    if (count && count != nbrMails) {
        element.lastResult = count;
        await element.save();
        if (nbrMails < count && nbrMails !== -1)
            return true;
    }
    return false;
}
module.exports.run = run;