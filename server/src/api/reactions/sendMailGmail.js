const { default: axios } = require("axios");
const MIMEText = require("mimetext");
const db = require("../../models");
const Reaction = db.reactions
const Tokens = db.tokens

const nameReaction = "Send mail Gmail"

async function create() {
    obj = await Reaction.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: 6,
        description: "Send a mail to on Gmail",
        params: ""
    };
    if (!obj) {
        await Reaction.create(reaction);
    }else {
        if (obj.name != reaction.name) {
            obj.name = reaction.name;
        }
        if (obj.serviceId != reaction.serviceId) {
            obj.serviceId = reaction.serviceId;
        }
        if (obj.description != reaction.description) {
            obj.description = reaction.description;
        }
        if (obj.params != reaction.params) {
            obj.params = reaction.params;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function run(element) {
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
    const tab = element.paramsReaction.split(",");
    const mail = tab[0];
    const corps = tab[1];
    const message = new MIMEText();
    message.setSender("area.tek.2023@gmail.com");
    message.setRecipient(mail);
    message.setSubject('AREACTION 🚀');
    message.setMessage(corps);
    const raw = {
        raw: message.asEncoded()
    };
    const res = await axios.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', raw,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
}
module.exports.run = run;