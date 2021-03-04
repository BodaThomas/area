const { default: axios } = require("axios");
const db = require("../../models");
const Reactions = db.reactions;

const nameReaction = "Create issue Github"

async function create() {
    obj = await Reactions.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: 5,
        description: "Create a new issue in the repo",
        params: "Repository"
    };
    if (!obj) {
        await Reactions.create(reaction); 
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
    const data = {
        name: tab[1],
        description: tab[2]
    };
    await axios.post(`https://api.github.com/user/repos`, data,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error);
    });
}
module.exports.run = run;