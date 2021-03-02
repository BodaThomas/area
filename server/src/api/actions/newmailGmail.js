const { Actions, Tokens } = require("../../models");

const nameAction = "New mail Gmail"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 6,
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

async function run(area) {
    let count = 0;
    const nbrMails = Number(area.lastResult);
    const token = await Tokens.findOne({ where : { userId: area.userId, serviceId: area.serviceId }}).accessToken;
    const apiKey = "";
    const res = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/profile?key=${apiKey}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }) || [];
    count = res.messagesTotal;
    if (count && count > nbrMails) {
        area.lastResult = count;
        await area.save();
        return true;
    }
    return false;
}
module.exports.run = run;