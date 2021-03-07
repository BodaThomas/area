const { default: axios } = require("axios");
const db = require("../../models");
const Reactions = db.reactions;
const Tokens = db.tokens;

const nameReaction = "Create issue Github"
const serviceId = 5

async function create() {
    obj = await Reactions.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: serviceId,
        description: "Create a new issue in the repo",
        params: "Repository,Title,Body"
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
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceId }});
    const token = tmp.accessToken;
    const tab = element.paramsReaction.split(",");
    console.log('run createissueGithub reaction')
    const res = await axios.get(`https://api.github.com/user`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error);
    });
    const username = res.data.login;
    const data = {
        title: tab[1],
        body: tab[2]
    }
    await axios.post(`https://api.github.com/repos/${username}/${tab[0]}/issues`, data,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log("Message:", error.message)
    });
}
module.exports.run = run;